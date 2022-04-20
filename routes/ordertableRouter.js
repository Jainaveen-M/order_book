const ordertableController = require('../controllers/ordertableController')
const path = require('path');
const { route } = require('express/lib/application');

const router = require('express').Router()

router.post('/addorder', ordertableController.addorder)

router.get('/getorder', ordertableController.getorder)

router.get('/getUUID', ordertableController.getUUID)

router.get('/getbuyordercurrenthash', ordertableController.getBuyOrderCurrentHash)

router.get('/getsellordercurrenthash', ordertableController.getSellOrderCurrentHash)


module.exports = router