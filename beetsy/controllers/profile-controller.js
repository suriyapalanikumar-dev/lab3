const connection = require("../config/db")
const jwt = require("jsonwebtoken");
const User = require("../model/user")
module.exports.updateprofileimage = async(req, res) =>{
    const {imgname} = req.body
    console.log(imgname)
    //find userid
    var authorization = req.headers.authorization.split(' ')[1],
    decoded;
    decoded = jwt.verify(authorization, 'TOP_SECRET');
    //console.log(decoded)
    var temp = await User.findOneAndUpdate({"_id":decoded.sub}, {"profileUrl":imgname})
    if(temp)
    {
      res.status(200).json("Profile details updated")
    }
    else{
      res.status(500).json("Error in Updating profile details")
    }
  }

  
  