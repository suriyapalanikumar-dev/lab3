//const connection = require("../config/db")
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const crypto = require('crypto');
const User = require("../model/user");
const { response } = require('../index.js');

genToken = user => {
  return jwt.sign({
    iss: 'suriya',
    sub: user.id,
    email: user.email,
    iat: new Date().getTime(),
    exp: new Date().setDate(new Date().getDate() + 1)
  }, 'TOP_SECRET');
}


module.exports.secretuser = async(req, res) =>{
  var authorization = req.headers.authorization.split(' ')[1],
            decoded;
  decoded = jwt.verify(authorization, 'TOP_SECRET');
  //console.log(decoded)
  res.status(200).json("success")
}
                  
module.exports.registeruser = async(req, res) =>{
  const {name, email, password } = req.body;
  
  //Check If User Exists
  let foundUser = await User.findOne({ email });
  if (foundUser) {
    return res.status(403).json({ error: 'Email is already in use'});
  }
  const newUser = new User({ name, email, password})
  await newUser.save()
  console.log(typeof newUser)
  console.log(newUser)
  // Generate JWT token
  //const token = genToken(newUser)
  res.status(200).json({newUser})
}

module.exports.loginuser = async(req, res) =>{
  const { email, password } = req.body;
  //Check If User Exists
  let foundUser = await User.findOne({ email });
  console.log(password)
  console.log(foundUser.password)
  if(await foundUser.matchPassword(password))
  {
    console.log("matched")
    let token = genToken(foundUser)
    console.log(typeof foundUser)
    console.log(foundUser)
    res.status(200).json({foundUser, "token":token})
  }
}

module.exports.updateUserdetails = async(req, res) =>{
  const {address, city, state, zip, dob, phone, country} = req.body
  var authorization = req.headers.authorization.split(' ')[1],
  decoded;
  decoded = jwt.verify(authorization, 'TOP_SECRET');
  console.log(decoded)
  var temp = await User.findOneAndUpdate({"_id":decoded.sub}, {"DOB":dob, "address":address,"state":state, "country":country, "city":city, "phone":phone})
  if(temp)
  {
    res.status(200).json("Picture Updated")
  }
  else{
    res.status(500).json("Error in Updating Picture details")
  }
}



 