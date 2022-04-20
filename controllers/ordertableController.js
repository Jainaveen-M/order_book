const req = require('express/lib/request')
const db = require('../models')

const {
    v4: uuidv4
} = require('uuid');

const orderTable = db.Ordertable


const addorder = async(req, res) => {
    let data = {
        uuid: req.body.uuid,
        qty: req.body.qty,
        price: req.body.price
    }
    try {
        await orderTable.create(data);
    } catch (e) {
        console.log(e);
    }

    res.status(200).send({ "message": "order added successfully" })
}

const getorder = async(req, res) => {
    let orders = await orderTable.findAll({
        order: [
            ['price', 'asc'],
        ],
        limit: 20
    })
    s = []
    for (var i = orders.length - 1; i >= 0; i--) {
        s.push(orders[i]['dataValues'])
    }
    res.status(200).send(s)
}


const getUUID = async(req, res) => {
    const uuid = uuidv4();
    console.log("YOUR UUID : ", uuid);
    const data = {
        uuid: uuid
    }
    res.status(200).send(data);
}

module.exports = {
    addorder,
    getorder,
    getUUID
}