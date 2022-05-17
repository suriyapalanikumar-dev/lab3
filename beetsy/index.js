const express = require('express')
const {graphqlHTTP} = require('express-graphql');
const schema = require('./schema/schema')
var bodyParser = require('body-parser');
const mongoose = require("mongoose");
var cors = require('cors');
var auth = require("./middleware/auth.js")
const jwt = require('jsonwebtoken');
const passport = require('passport')
const InitiateMongoServer = require("./config/db")
InitiateMongoServer() 
//const graphqlHTTP = require('express-graphql').graphqlHTTP

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

const imgctrl = require("./controllers/image-controller.js")

app.post("/uploaditemdp",upload.single('profile-file'), imgctrl.uploadpic)
app.get("/image/:key",imgctrl.retrieveImg)

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql:true
}));

app.listen(3000, () => {
  console.log('Listening on port 3000');
});