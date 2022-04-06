const ordercontroller = require('../controllers/orderController')
const path = require('path');

const router = require('express').Router()


router.get('/allbuyorder', ordercontroller.getAllBuyOrder)

router.get('/allsellorder', ordercontroller.getAllSellOrder)

//router.post('/insert',buyorderController.insertPosition)

router.get('/home',(req,res)=>{
    const p = path.join(process.cwd()+"/public/home.html")
    res.sendFile(p)
})


module.exports = router