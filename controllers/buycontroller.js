const db = require('../models')

const Buy = db.Buy


const addBuyOrder = async(req,res)=>{
    let data = {
        id:req.body.id,
        qty:req.body.qty,
        price:req.body.price,
        total_price:req.body.price
    }
    try{
        await Buy.create(data)

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


const getAllBuyOrder = async (req, res) => {

    // let buy = await Buy.findAll({})
    // res.status(200).send(buy)
    // orderProcessor()
    let buy = await Buy.findAll({
        order: [
            ['price', 'DESC'],
        ]
    })
    b =[]
    for (var i = 0; i < buy.length && i<20; i++){
        b.push(buy[i]['dataValues'])
    }
    // b.sort(GetSortOrder("price"))
    console.log(b);
    // console.log("======= index of the new element ======",buy.findIndex(obj => obj['price']==84))

    res.status(200).send(b)

}

const orderProcessor = async(req,res)=>{
    let buy = await Buy.findAll({order: [,
        ['price', 'DESC'],
    ]})
    b =[]
    for (var i = 0; i < buy.length && i<20; i++){
        b.push(buy[i]['dataValues'])
    }
    b.sort(GetSortOrder("price"))
    // console.log("======= index of the new element ======",b.findIndex(obj => obj['price']==84));
    console.log(b);
}


const insertPosition =async (req,res)=>{
    let buy = await Buy.findAll({
        order: [
            ['price', 'DESC'],
        ]
    })
    b =[]
    for (var i = 0; i < buy.length && i<20; i++){
        b.push(buy[i]['dataValues'])
    }
    // b.sort(GetSortOrder("price"))
    console.log(b);
    var insertPos = buy.findIndex(obj => obj['price']==req.body.price)
    console.log("======= index of the new element ======  ",insertPos)
    data = {
        "insert_position":insertPos
    }
    res.send(data)
}


function GetSortOrder(prop) {    
    return function(a, b) {    
        if (a[prop] > b[prop]) {    
            return 1;    
        } else if (a[prop] < b[prop]) {    
            return -1;    
        }    
        return 0;    
    }    
}

module.exports = {
    addBuyOrder,
    getAllBuyOrder,
    orderProcessor,
    insertPosition
}