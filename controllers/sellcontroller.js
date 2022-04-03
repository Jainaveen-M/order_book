const db = require('../models')

const Buy = db.Buy


const addsellOrder = async(req,res)=>{
    let data = {
        id:req.body.id,
        qty:req.body.qty,
        price:req.body.price,
        total_price:req.body.price
    }
    try{
        //const buy = await Buy.create(data)

    }
    catch(e){
        console.log(e);
    }
   
    res.status(200).send(data)
    console.log("buy order details ",data)
}


module.exports = {
    addsellOrder,
}
