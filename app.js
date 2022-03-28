const app = require('express')()
const http = require('http').createServer(app)

app.get('/', (req, res) => {
    res.send("Node Server is running. Yay!!")
})

// Listen to the port 3344

var port = process.env.PORT || 3344;
http.listen(port, function (err) {
  if (err) console.log(err);
  console.log('Listening on port', port);
});


// socket 

const socketIO = require('socket.io')(http)

socketIO.on("connection", (userSocket) => {
    userSocket.on("send_message", (data) => {
        userSocket.broadcast.emit("receive_message", data)
    })
})


socketIO.on('connection',  (client)=> {
    console.log('Connected...', client.id);



//listens when a user is disconnected from the server
client.on('disconnect',  () =>{
    console.log('Disconnected......', client.id);
  })

client.on('error',  (err) =>{
    console.log('Error detected', client.id);
    console.log(err);
})


// listen for messages from client
client.on('message',  (data) =>{
    console.log("message",data);
    socketIO.emit('message', data);
  })





client.on('custom_event',  () =>{
    console.log('client id......', client.id);
})

})