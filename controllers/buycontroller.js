const req = require('express/lib/request')
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
        // await Buy.create(data)
        await insertBuyOrderPosition(data)
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
            ['price', 'ASC'],
        ]
    })
    b =[]
    for (var i = 0; i < buy.length && i<20; i++){
        b.push(buy[i]['dataValues'])
    }
    // b.sort(GetSortOrder("price"))
    //console.log(b);
    // console.log("======= index of the new element ======",buy.findIndex(obj => obj['price']==84))

    res.status(200).send(b)

}

const orderProcessor = async(req,res)=>{
    let buy = await Buy.findAll({order: [,
        ['price', 'ASC'],
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
    // TODO: to find the prev min and find the index and add it to the row
    b =[]
    for (var i = 0; i < buy.length && i<20; i++){
        b.push(buy[i]['dataValues'])
        
    }
    for (var i = 0; i < buy.length && i<20; i++){
        b.push("=== before price == ",b[i].price)
        
    }
    b.splice(locationOf(req.body.price, b) + 1, 0, req.body.price);
    for(var i=0;i<b.length;i++){
        console.log("==price == ",b[i].price);
    }
    console.log("After ",b);
    console.log("======= index of the new element ======  ",b.indexOf(req.body.price))
    data = {
        "insert_position":b.indexOf(req.body.price)
    }
    res.send(data)
}


function locationOf(el, arr, st, en) {
    st = st || 0;
    en = en || arr.length;
    for (i = 0; i < arr.length; i++) {
        if (arr[i].price < el)
            return i;
    }
    return en;
  }

const insertBuyOrderPosition = async (data)=>{
    return Buy.count({ where: { price: data.price } })
      .then(async (count) =>{
        if (count != 0) {
          console.log("Price is already present")
          var prevQty = await Buy.findOne({where : {price:data.price}});
          console.log("======= prev values ==== ",prevQty)
          const qty = prevQty.qty+data.qty;
          await Buy.update(
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
        Buy.create(data)
        return true;
    });
} 


// const updateBuyOrder = async () =>{
//     let buy = await Buy.findAll({
//         order: [
//             ['price', 'DESC'],
//         ]
//     })
//     var insertPos = buy.findIndex(obj => obj['price']==req.body.price)
//     data = {
//         "insert_position":insertPos
//     }
//     res.send(data)
// }


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
   // updateBuyOrder
}