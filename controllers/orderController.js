const req = require('express/lib/request')
const db = require('../models')

const Buy = db.Buy
const Sell = db.Sell

const getAllBuyOrder = async (req, res) => {
    let buy = await Buy.findAll({
        order: [
            ['price', 'asc'],
        ]
    })
    b = []
    for (var i = 0; i < buy.length; i++){
        b.push(buy[i]['dataValues'])
    }
    res.status(200).send(b)
}

const getAllSellOrder = async (req,res)=>{
    let sell = await Sell.findAll({
        order: [
            ['price', 'desc'],
        ],
    })
    s = []
    for (var i = 0; i < sell.length; i++){
        s.push(sell[i]['dataValues'])
    }
    res.status(200).send(s)
}



module.exports = {
    getAllBuyOrder,
    getAllSellOrder
}