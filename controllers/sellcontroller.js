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

        // await Buy.findOne({where : {price:req.body.price}}).then(async (buy)=>{
        //     if(buy == null){
        //         await Buy.create(data)
        //     }
        //     else{
        //         var prevQty = await Buy.findOne({where : {price:req.body.price}});
        //         console.log(prevQty)
        //         Buy.find({where : {price:req.body.price}}).on('success',(buy)=>{
        //             if(buy){
        //                 buy.update({qty: prevQty+req.body.qty});
        //             }
        //         })
        //     }
        // })
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
