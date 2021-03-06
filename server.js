const express = require('express')
const app = express()
const http = require('http').createServer(app)


app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
        res.send("socket connected successfully...")
    })
    // routers
const buyrouter = require('./routes/buyorderRouter.js')
app.use('/api/buyorder', buyrouter)
const sellrouter = require('./routes/sellorderRouter.js')
app.use('/api/sellorder', sellrouter)
const allorders = require('./routes/orderRouter.js')
app.use('/api/allorder', allorders)
const ordertable = require('./routes/ordertableRouter.js')
app.use('/api/ordertable', ordertable)

//port

// const PORT = process.env.PORT || 3344

//server

// app.listen(PORT, () => {
//     console.log(`server is running on port ${PORT}`)
// })

//Socket Logic
const socketIO = require('socket.io')(http)
a = []
socketIO.on("connection", (userSocket) => {
    userSocket.on("send_message", (data) => {
        userSocket.broadcast.emit("receive_message", data)
    })
})

var count = 0;
socketIO.on('connection', (client) => {
    console.log('Connected...', client.id);
    console.log('Connected broadcast', client.broadcast);
    client.on('connect', (data) => {
        console.log("connect === ", client.id);
        socketIO.emit('connect message', data);
    })
    count += 1;
    console.log("======= user count =====", count);
    socketIO.emit('usercount', count);
    //listens for new messages coming in
    client.on('message', (data) => {
        console.log("message", data);
        a.push(data)
        console.log(a.length)
        socketIO.emit('message', data);
    })


    //listens for new messages coming in
    client.on('refresh', (data) => {
        console.log("refresh", data);
        socketIO.emit('refresh', data);
    })

    client.on('delete', (data) => {
        console.log("delete", data);
        socketIO.emit('delete', data);
    })



    //listens when a user is disconnected from the server
    client.on('disconnect', () => {
        console.log('Disconnected......', client.id);
    })

    //listens when there's an error detected and logs the error on the console
    client.on('error', (err) => {
        console.log('Error detected', client.id);
        console.log(err);
    })


    client.on("buyorder", (data) => {
        console.log("buy order...", data)
        socketIO.emit('buyorder', data);
    })


    client.on("sellorder", (data) => {
        console.log("sell order...", data)
        socketIO.emit('sellorder', data);
    })


})



var port = process.env.PORT || 3344;
http.listen(port,"192.168.0.248", function(err) {
    if (err) console.log(err);
    console.log('Listening on port', port);
});