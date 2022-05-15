const  mongoose = require('mongoose')
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");
const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        required:[true, 'Please add a name'],
    },
    email:{
        type: String,
        required: [true, 'Please add an email'],
        unique: true,
        match: [
          /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
          'Please add a valid email'
        ]
    },
    password:{
        type: String,
        required: [true, 'Please add a password'],
        minlength:[8, 'Password should be at least 8 characters long']
    },
    DOB : {type:Date,default:''},
    city: {type:String,default:''},
    state : {type:String,default:''},
    country : {type:String,default:''},
    address : {type:String,default:''},
    phone : {type:Number,default:0000000000},
    profileUrl:{
        type: String,
        maxlength:300,
        default:''
    },
    about :{
        type: String,
        maxlength: [100, "About information can not be more than 100 characters"],
        default:''
    },
    favorites:{
        type:[String],
    },
    purchases:{
        type:[String],
    },
    cart:{
        type:[String],
    },
    gift:{
        type:[Number],
    },
    giftdesc:{
        type:[String],
        default:["No gift message"]
    },
    count:{
        type:[Number],
    },
    createdAt:{
        type: Date,
        default:Date.now
    }
})

UserSchema.pre('save', async function(){
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt)
});

UserSchema.methods.matchPassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password)
};
module.exports = mongoose.model('User',UserSchema)