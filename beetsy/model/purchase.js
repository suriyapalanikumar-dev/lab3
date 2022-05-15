const  mongoose = require('mongoose')
const jwt = require("jsonwebtoken");
const PurchaseSchema = new mongoose.Schema({
    itemids:{
        type: [String]
    },
    gift:{
        type:[String]
    },
    quantity:{
        type:[String]
    },
    price:{
        type:[String]
    },
    totalAmount:Number, 
    createdAt:{
        type: Date,
        default:Date.now
    }
})


module.exports = mongoose.model('Purchase',PurchaseSchema)