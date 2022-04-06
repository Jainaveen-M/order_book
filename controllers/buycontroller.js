const req = require('express/lib/request')
const db = require('../models')

const Buy = db.Buy


const addBuyOrder = async(req,res)=>{
    let data = {
        qty:req.body.qty,
        price:req.body.price,
        total_price:req.body.price
    }

    try{
         await insertBuyOrderPosition(data)
    }
    catch(e){
        console.log(e);
    }
   
    res.status(200).send(data)
    console.log("buy order details ",data)
}


const getAllBuyOrder = async (req, res) => {
    let buy = await Buy.findAll({
        order: [
            ['price', 'asc'],
        ]
    })
    b =[]
    for (var i = 0; i < buy.length && i<20; i++){
        b.push(buy[i]['dataValues'])
    }
    res.status(200).send(b)
}

const insertPosition =async (req,res)=>{
    let buy = await Buy.findAll({
        order: [
            ['price', 'desc'],
        ]
    })
    // TODO: to find the prev min and find the index and add it to the row
    diff=[];
    b =[]
    for (var i = 0; i < buy.length && i<20; i++){
        b.push(buy[i]['dataValues'])
    }
    p =[];
    for(var i=0;i<b.length;i++){
        p.push(b[i].price)
    }
    q=[];
    for(var i=0;i<b.length;i++){
        q.push(b[i].qty)
    }
    console.log(" ===Price === ",p);
    console.log("p.indexOf(req.body.price)",p.indexOf(req.body.price));
    // IF THE ELEMENT IS NOT PRESENT RETURN INSERT POSITION
   if(p.indexOf(req.body.price)==-1){
    for(var i=0;i<b.length;i++){
        console.log(" === after price === ",b[i]);
    }
    b.splice(locationOf(req.body.price, b) + 1, 0, req.body.price);
    for(var i=0;i<b.length;i++){
        console.log(" === after price === ",b[i]);
    }
    console.log("After ",b);
    console.log(" ======= index of the new element ======  ",b.indexOf(req.body.price))
    // if 0 element is not present 
    data = {
        "insert_position":b.indexOf(req.body.price),
        "status":0
    }
   }
   else{
    // if 1 element is present 
    data = {
        "insert_position":p.indexOf(req.body.price),
        "status":1
    }
   }
   diff.push(data);
   res.send(data)
}

//TO FIND THE INDEX
function locationOf(el, arr, st, en) {
    st = st || 0;
    en = en || arr.length;
    for (i = 0; i < arr.length; i++) {
        if (arr[i].price < el)
            return i;
    }
    console.log("insert postion from the location of function",en)
    return en;
  }

  // 
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




module.exports = {
    addBuyOrder,
    getAllBuyOrder,
    insertPosition
}