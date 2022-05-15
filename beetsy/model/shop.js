const  mongoose = require('mongoose')
const ShopSchema = new mongoose.Schema({
    shopname:{
        type: String,
        required:[true, 'Please add a Shop name'],
    },
    ownerID:{
        type: String,
        default:''
    },
    shopphoto:{
        type: String,
        default:''
    },
    createdAt:{
        type: Date,
        default:Date.now
    }
})

module.exports = mongoose.model('Shop',ShopSchema)