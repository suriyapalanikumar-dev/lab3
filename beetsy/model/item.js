const  mongoose = require('mongoose')
const ItemSchema = new mongoose.Schema({
    itemname:{
        type: String,
        required:[true, 'Please add a Item name'],
    },
    itemcount:{
        type: Number,
        default:0
    },
    itemphoto:{
        type: String,
        default:''
    },
    itemcategory : {type:String,default:''},
    itemdesc: {type:String,default:''},
    price : {type:Number,default:0},
    shopname : {type:String,default:''},
    isFavorite:{type:String, default:'No'},
    itemsold:{
        type: Number,
        default:0
    },
    createdAt:{
        type: Date,
        default:Date.now
    }
})



module.exports = mongoose.model('Item',ItemSchema)