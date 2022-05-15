const connection = require("../config/db")
const Item = require("../model/item")
const User = require("../model/user")
const jwt = require("jsonwebtoken");
const Purchase = require("../model/purchase")

module.exports.enrollItem = (req, res) =>{
  try{
    const {itemname, 
      itemcount,
      itemphoto,
      itemcategory,
      itemdesc,
      price,
      shopname} = req.body
      let newItem = new Item({"itemname":itemname, "itemcount":itemcount,"itemphoto":itemphoto, "itemcategory":itemcategory,"itemdesc":itemdesc,"price":price,"shopname":shopname})
      newItem.save()
      if(newItem)
      {
        res.status(200).json({
          data: "Item Created"
        })
      }
      else{
        res.status(500).json({
          data: "Item cannot be created"
        })
      }
  }
  catch(err){
    res.status(500).json({
      data:err
    })
  }

}

module.exports.fetchItem = async(req,res) =>{
  //console.log(req.params)
  const shopname = req.params.shopname
  console.log(shopname)
  var temp = await Item.find({"shopname":shopname})
  console.log(temp)
  if(temp)
  {
    var resp = []
    temp.forEach(i=>{
      resp.push(i["itemname"])
    })
    res.status(200).json(resp)  
  }
  else{
    res.status(500).json("Error in Updating profile details")
  }
}

module.exports.checkout = async(req, res)=>{
  var authorization = req.headers.authorization.split(' ')[1],
  decoded;
  decoded = jwt.verify(authorization, 'TOP_SECRET');
  var temp = await User.findOne({"_id":decoded.sub})
  var ta = temp["purchases"]
  var temp1 = await Item.find({ '_id': { $in: temp["cart"] } });
  var p = []
  //console.log(temp1)
  temp1.forEach(element => {
      p.push(element["price"])
  });
  //console.log(p)
  var temp2 = await new Purchase({"itemids":temp["cart"], "gift":temp["giftdesc"], "quantity":temp["count"],"price":p})
  temp2.save()
  var temparr = ta.push(temp2["_id"])
  console.log("_____")
  console.log(ta)
  // // console.log(temp)
  // // console.log(temp["purchases"])
  // console.log(temparr)
  var temp3 = await User.findOneAndUpdate({"_id":decoded.sub},{"cart":[],"giftdesc":[],"count":[], "purchases":ta})
  // console.log(temp2)
  res.status(200).json(temp2["_id"]) 
}

module.exports.updateItem = async(req,res) =>{
  const {itemname, 
    itemcount,
    itemdesc,
    price} = req.body
  var temp = await Item.findOne({"itemname":itemname})
  if(!temp)
  {
    res.status(500).json("Please enter an existing item")
  }
  if(temp)
  {
    let data = {}
     if(itemcount)
     {
       data["itemcount"] = itemcount
     }
     if(itemdesc)
     {
       data["itemdesc"] = itemdesc
     }
     if(price)
     {
       data["price"] = price
     }
     console.log(data)
     var temp1 = await Item.findOneAndUpdate({"itemname":itemname},data)
     res.status(200).json(temp1)
  }
  else{
    res.status(500).json("Error in Updating profile details")
  }
}

module.exports.getallItems = async(req, res) =>{
  try{
    var temp = await Item.find({},{"_id":1, "itemname":1, "isFavorite":1, "price":1,"itemphoto":1}).sort([['createdAt', -1]])
    res.status(200).json(temp)
  }
  catch(err)
  {
    res.status(500).json("Error in fetching items")
  }
}

module.exports.setFavorite = async(req, res)=>{
  try{
    const {itemid} = req.body
    var authorization = req.headers.authorization.split(' ')[1],
    decoded;
    decoded = jwt.verify(authorization, 'TOP_SECRET');
    var temp = await User.findOne({"_id":decoded.sub})
    if(temp)
    {
      temp["favorites"].push(itemid)
      temp.save()
      res.status(200).json("Favorites set")
    }
    else{
      res.status(200).json("Favorites cannot be set")
    }
  }
  catch(err)
  {
    res.status(500).json(err)
  }
}

module.exports.removeFavorite = async(req, res)=>{
  try{
    const {itemid} = req.body
    var authorization = req.headers.authorization.split(' ')[1],
    decoded;
    decoded = jwt.verify(authorization, 'TOP_SECRET');
    var temp = await Item.findOneAndUpdate({"_id":itemid},{"isFavorite":"No"})
    if(temp)
    {
      res.status(200).json("Favorites Removed")
    }
    else{
      res.status(500).json("Favorites cannot be removed")
    }
  }
  catch(err)
  {
    res.status(500).json(err)
  }
}


module.exports.fetchFavorite = async(req, res)=>{
  try{

    var authorization = req.headers.authorization.split(' ')[1],
    decoded;
    decoded = jwt.verify(authorization, 'TOP_SECRET');
    var temp = await User.findOne({"_id":decoded.sub})
    console.log(temp)
    if(temp["favorites"].length>0)
    {
      console.log(temp)
      var temp1 = await Item.find({ '_id': { $in: temp["favorites"] } });
      res.status(200).json({temp1,"dp":temp["profileUrl"]})
    }
    else{
      res.status(200).json("No favorites")
    }
  }
  catch(err)
  {
    res.status(500).json(err)
  }
}

module.exports.fetchSearch = async(req, res) =>{
  try{
    const {value} = req.body
    const resp = []
    const val = value.toLowerCase()
    var temp1 = await Item.find({});
    //console.log(temp1)
    temp1.forEach(element => {
      if(element["itemname"].toLowerCase().includes(val))
      {
        resp.push(element)
        console.log(resp)
      }
    });
    //console.log(resp)
    res.status(200).json(resp)
  }
  catch(err){

  }
}

module.exports.summaryItem = async(req,res) =>{
  const {itemid
    } = req.body
  var temp = await Item.findOne({"_id":itemid})
  if(!temp)
  {
    res.status(500).json("Please enter an existing item")
  }
  if(temp)
  {
     res.status(200).json(temp)
  }
  else{
    res.status(500).json("No such items")
  }
}


module.exports.addToCart = async(req,res) =>{
  const {itemid, sellvalue} = req.body 
  var authorization = req.headers.authorization.split(' ')[1],
  decoded;
  decoded = jwt.verify(authorization, 'TOP_SECRET');
  var temp = await User.findOne({"_id":decoded.sub})
  if(temp){
    var temp1 =await Item.findOne({"_id":itemid})
    var t = temp1["itemsold"]+sellvalue
    if(t>temp1["itemcount"])
    {
      res.status(200).json("Item is not in stock for the selected quantity")
    }
    else{
    if(!temp["cart"].includes(itemid))
    {
      temp["cart"].push(itemid)
      temp["count"].push(sellvalue)
      temp["gift"].push(0)
      temp["giftdesc"].push("")
      temp.save()
    }
      var temp2 = await Item.findOneAndUpdate({"_id":itemid},{"itemsold":t})
      res.status(200).json("Items added to Cart")
    }

  }
  else{
    res.status(500).json("Cannot add items to cart")
  }
}

module.exports.getallCart = async(req, res) =>{
  var authorization = req.headers.authorization.split(' ')[1],
  decoded;
  decoded = jwt.verify(authorization, 'TOP_SECRET');
  var temp = await User.findOne({"_id":decoded.sub})
  var temp1 = await Item.find({ '_id': { $in: temp["cart"] } });
  res.status(200).json(temp1)
}

module.exports.deleteCart = async(req, res) =>{
  const {itemid} = req.body
  var authorization = req.headers.authorization.split(' ')[1],
  decoded;
  decoded = jwt.verify(authorization, 'TOP_SECRET');
  var temp = await User.findOne({"_id":decoded.sub})
  var aIndex = temp["cart"].indexOf(itemid);
  if (aIndex !== -1) {
    temp["cart"].splice(aIndex, 1);
  }
  console.log(temp["cart"])
  if (aIndex !== -1) {
    temp["count"].splice(aIndex, 1);
    temp["gift"].splice(aIndex, 1);
    temp["giftdesc"].splice(aIndex, 1);
  }
  console.log(temp["cart"])
  console.log(temp["count"])
  var temp1 = await User.findOneAndUpdate({"_id":decoded.sub},{"cart":temp["cart"],"count":temp["count"],"gift":temp["gift"],"giftdesc":temp["giftdesc"]})
  var temp2 = await Item.find({ '_id': { $in: temp["cart"] } });
  res.status(200).json(temp2)
}

module.exports.saveCart = async(req, res) =>{
  const {itemid, sellvalue} = req.body
  var authorization = req.headers.authorization.split(' ')[1],
  decoded;
  decoded = jwt.verify(authorization, 'TOP_SECRET');
  var temp = await User.findOne({"_id":decoded.sub})
  if(temp){
    var temp1 =await Item.findOne({"_id":itemid})
    var t = temp1["itemsold"]+sellvalue
    if(t>temp1["itemcount"])
    {
      res.status(200).json("Item is not in stock for the selected quantity")
    }
    else{
      var aIndex = temp["cart"].indexOf(itemid);
      temp["count"][aIndex] = sellvalue
      temp.save()
      console.log(temp)
      var temp2 = await Item.findOneAndUpdate({"_id":itemid},{"itemsold":t})
      res.status(200).json(temp2)
    }
  }
  else{
    res.status(500).json("Cannot add items to cart")
  }
}

module.exports.saveDesc = async(req, res) =>{
  const {itemid, sellvalue} = req.body
  var authorization = req.headers.authorization.split(' ')[1],
  decoded;
  decoded = jwt.verify(authorization, 'TOP_SECRET');
  var temp = await User.findOne({"_id":decoded.sub})
  if(temp){
      var aIndex = temp["cart"].indexOf(itemid);
      temp["giftdesc"][aIndex] = sellvalue
      temp.save()
      //var temp2 = await Item.findOneAndUpdate({"_id":itemid},{"itemsold":t})
      res.status(200).json("Description Updated ")
    }
  
  else{
    res.status(500).json("Cannot add gift desc to cart")
  }
}

module.exports.purchaseitems = async(req, res) =>{
  // const {pagevalue} = req.body
  var authorization = req.headers.authorization.split(' ')[1],
  decoded;
  decoded = jwt.verify(authorization, 'TOP_SECRET'); 
  var temp = await User.findOne({"_id":decoded.sub})
  var temp1 = await Purchase.find({ '_id': { $in: temp["purchases"] } }).sort([['createdAt', -1]]);
  var collectids = []
  var map_date = {}
  var map_id = {}
  var map_gift = {}
  temp1.forEach(element => {
    
    collectids = [...collectids, ...element["itemids"]]
    element["itemids"].forEach((e,i) => {
        map_date[e] = element["createdAt"]
        map_id[e] = element["_id"]
        map_gift[e] = element["gift"][i]
    });
    //console.log(collectids)
  });
  var temp2 = await Item.find({ '_id': { $in: collectids } });
  var resp =[]
  console.log(map_date)
  console.log(map_id)
  res.status(200).json({"temp2":temp2, "map_date":map_date, "map_id":map_id, "map_gift":map_gift})
}