// const app = require('express')()
// const http = require('http').createServer(app)
// const { mainModule } = require('process');
// const db = require("./models");

// const { Buy } = require("./models/buy") 

// db.sequelize.sync().then((req)=>{
//     var port = process.env.PORT || 3344;
//     http.listen(port, function (err) {
//         if (err) console.log(err);
//       console.log('Listening on port', port);
//     });
// });

// app.get('/', (req, res) => {
//     res.send({"message":"socket.io and mysql connected successfully..."})
// })


// app.get('/insert', (req,res) => {
//     Buy.create({
//         id:1,
//         qty:100,
//         price:25,
//         total_price:2500
//     }).catch(err => {
//         if(err){
//             console.log(err);
//         }
//     })
//     res.send({"error":err});
// });

// app.get("/buys", async (req,res) =>{
//     try{
//         const buy = await Buy.findAll({include:'buys'});
//         return res.json(buy);
//     }catch(err){
//         console.log(err);
//         return res.status(500).json({err: "An error occured"});
//     }
// });


// // var con = mysql.createConnection({
// //     host: "localhost",
// //     user: "root",
// //     password: "root12345",
// //     database: "orderbook"
// //   });
  
// //   con.connect(function(err) {
// //     if (err) throw err;
// //     console.log("Connected!");
// //     con.query("SELECT * FROM buys", function (err, result, fields) {
// //         // if (err) throw err;
// //         console.log(result);
// //       });
// //   });



// // var port = process.env.PORT || 3344;
// // http.listen(port, function (err) {
// //   if (err) console.log(err);
// //   console.log('Listening on port', port);
// // });

// // socket 

// const socketIO = require('socket.io')(http)

// socketIO.on("connection", (userSocket) => {
//     userSocket.on("send_message", (data) => {
//         userSocket.broadcast.emit("receive_message", data)
//     })
// })


// socketIO.on('connection',  (client)=> {
//     console.log('Connected...', client.id);



// //listens when a user is disconnected from the server
// client.on('disconnect',  () =>{
//     console.log('Disconnected......', client.id);
//   })
  

// client.on('error',  (err) =>{
//     console.log('Error detected', client.id);
//     console.log(err);
// })


// // listen for messages from client
// client.on('message',  (data) =>{
//     console.log("message",data);
//     socketIO.emit('message', data);
//   })


//   client.on("send_message",(data)=>{
//       console.log("send message ",data)
//       socketIO.emit('send_message',data)
//   })

// client.on('custom_event',  () =>{
//     console.log('client id......', client.id);
// })

// })