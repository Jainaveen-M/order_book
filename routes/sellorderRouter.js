const { route } = require('express/lib/application')
const sellorderController = require('../controllers/sellcontroller')
const path = require('path');
var fs = require('fs');

const express = require('express')

const router = require('express').Router()


router.post('/addsellorder', sellorderController.addSellOrder)

router.get('/getsellorder', sellorderController.getAllSellOrder)

router.post('/insert',sellorderController.insertPosition)

router.get('/home',(req,res)=>{
    const p = path.join(process.cwd()+"/public/index.html")
    res.sendFile(p)
})

module.exports = router