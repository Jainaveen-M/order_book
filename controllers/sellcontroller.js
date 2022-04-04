const req = require('express/lib/request')
const db = require('../models')

const Sell = db.Sell


const addSellOrder = async (req,res)=>{
    let data = {
        id:req.body.id,
        qty:req.body.qty,
        price:req.body.price,
        total_price:req.body.price
    }

    try{
       await insertSellOrderPosition(data)
    }
    catch(e){
        console.log(e);
    }
    res.status(200).send(data)
    console.log("sell order details ",data)
}


const getAllSellOrder = async (req,res)=>{
    let sell = await Sell.findAll({
        order: [
            ['price', 'desc'],
        ]
    })
    s =[]
    for (var i = 0; i < sell.length && i<20; i++){
        s.push(sell[i]['dataValues'])
    }
    res.status(200).send(s)
}


const insertSellOrderPosition = async (data)=>{
    return Sell.count({ where: { price: data.price } })
      .then(async (count) =>{
        if (count != 0) {
          console.log("Price is already present")
          var prevQty = await Sell.findOne({where : {price:data.price}});
          console.log("======= prev values ==== ",prevQty)
          const qty = prevQty.qty+data.qty;
          await Sell.update(
              {
                  qty :qty,
                    total_price:qty*data.price
                }
              ,{
                  where: {
                      price:data.price
                    }
                })
          return false;
        }
        console.log("Price is not present in the table")
        Sell.create(data)
        return true;
    });
}


const insertPosition =async (req,res)=>{
    let sell = await Sell.findAll({
        order: [
            ['price', 'asc'],
        ]
    })
    // TODO: to find the prev min and find the index and add it to the row
    s =[]
    for (var i = 0; i < sell.length && i<20; i++){
        s.push(sell[i]['dataValues'])
        
    }
    p =[];
    for(var i=0;i<s.length;i++){
        p.push(s[i].price)
    }
   if(p.indexOf(req.body.price)==-1){
    for(var i=0;i<s.length;i++){
        console.log("=== after price === ",s[i]);
    }
    s.splice(locationOf(req.body.price, s) + 1, 0, req.body.price);
    for(var i=0;i<s.length;i++){
        console.log("=== after price === ",s[i]);
    }
    console.log("After ",s);
    console.log("======= index of the new element ======  ",s.indexOf(req.body.price))
    data = {
        "insert_position":s.indexOf(req.body.price),
        "status":0
    }
   }
   else{
    data = {
        "insert_position":s.indexOf(req.body.price),
        "status":1
    }
   }
    res.send(data)
}


function locationOf(el, arr, st, en) {
    st = st || 0;
    en = en || arr.length;
    for (i = 0; i < arr.length; i++) {
        if (arr[i].price > el)
            return i;
    }
    return en;
  }

  module.exports = {
      addSellOrder,
      getAllSellOrder,
      insertPosition
  }