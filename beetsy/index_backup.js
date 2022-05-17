require("dotenv").config();
var express = require('express');
const graphqlHTTP = require('express-graphql');
var bodyParser = require('body-parser');
const mongoose = require("mongoose");
var cors = require('cors');
var auth = require("./middleware/auth.js")
const jwt = require('jsonwebtoken');
const passport = require('passport')
const InitiateMongoServer = require("./config/db")
InitiateMongoServer()
require('./config/passport')



const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());


const multer = require("multer");
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    //console.log(file)
    cb(null, Date.now()+'-'+file.originalname)
  }
})


var upload = multer({ storage: storage })
app.use(express.static(__dirname + '/public'));
app.use('/uploads', express.static('uploads'));

const { API_PORT } = process.env;
const port =  API_PORT;

const authenticatectrl = require('./controllers/authenticate-controller.js')
const imgctrl = require("./controllers/image-controller.js")
const profilectrl = require('./controllers/profile-controller.js')
const shopctrl = require('./controllers/shop-controller.js')
const itemctrl = require('./controllers/item-controller.js')

app.post("/register", authenticatectrl.registeruser)
app.post("/login", authenticatectrl.loginuser)
app.get("/secret", passport.authenticate('jwt',{session: false}), authenticatectrl.secretuser)
app.post("/uploadprofiledp",upload.single('profile-file'), imgctrl.uploadpic)
app.post("/updateprofileimgdb", passport.authenticate('jwt',{session: false}),profilectrl.updateprofileimage)
app.get("/image/:key",imgctrl.retrieveImg)
app.post("/updateProfile", passport.authenticate('jwt',{session: false}),authenticatectrl.updateUserdetails)
app.post("/checkshopname", passport.authenticate('jwt',{session: false}),shopctrl.isshopnameavailabile)//&&
app.post("/createshopdetails", passport.authenticate('jwt',{session: false}), shopctrl.createshopname)//##
app.post("/displayshopdetails", passport.authenticate('jwt',{session: false}),shopctrl.getshopdetails)//&&
app.post("/uploadshopdp",upload.single('profile-file'), imgctrl.uploadpic)
app.post("/updateshopimgdb", shopctrl.updateshopimage)
app.post("/additem",itemctrl.enrollItem)//##
app.post("/uploaditemdp",upload.single('profile-file'), imgctrl.uploadpic)
app.get("/getuniqueItems/:shopname", itemctrl.fetchItem)
app.post("/editItem", itemctrl.updateItem)//##
app.get("/displayItems", itemctrl.getallItems)//&&
app.post("/makeFavorite",passport.authenticate('jwt',{session: false}), itemctrl.setFavorite)//##
app.post("/deleteFavorite", passport.authenticate('jwt',{session: false}),itemctrl.removeFavorite)
app.get("/getFavorite", passport.authenticate('jwt',{session: false}),itemctrl.fetchFavorite)//&&
app.post("/searchResults", itemctrl.fetchSearch)//##
app.post("/summaryItem", itemctrl.summaryItem)//&&
app.post("/addCart",passport.authenticate('jwt',{session: false}),itemctrl.addToCart) //##
app.get("/fetchCart",passport.authenticate('jwt',{session: false}),itemctrl.getallCart)//&&
app.post("/deleteCart",passport.authenticate('jwt',{session: false}),itemctrl.deleteCart)
app.post("/saveCart",passport.authenticate('jwt',{session: false}),itemctrl.saveCart)
app.post("/saveDesc",passport.authenticate('jwt',{session: false}),itemctrl.saveDesc)
app.post("/proceedCheckout",passport.authenticate('jwt',{session: false}),itemctrl.checkout)//##
app.post("/mypurchases", passport.authenticate('jwt',{session: false}),itemctrl.purchaseitems)//&&
//server listening 
app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});

module.exports = app