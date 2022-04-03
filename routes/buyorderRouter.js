const { route } = require('express/lib/application')
const buyorderController = require('../controllers/buycontroller')
const path = require('path');
var fs = require('fs');

const express = require('express')

const router = require('express').Router()


router.post('/addbuyorder', buyorderController.addBuyOrder)

router.get('/getbuyorder', buyorderController.getAllBuyOrder)

router.post('/insert',buyorderController.insertPosition)

router.get('/home',(req,res)=>{
    const p = path.join(process.cwd()+"/public/index.html")
    res.sendFile(p)

    // response.writeHead(200, {'Content-Type': 'text/html'});
    // fs.readFile(p, null, function(error, data) {
    //     if (error) {
    //         response.writeHead(404);
    //         response.write('File not found');
    //     } else {
    //         response.write(data);
    //     }
    //     response.end();
    // });

})





module.exports = router