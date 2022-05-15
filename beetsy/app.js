require("dotenv").config();
require("./config/db")
const express = require("express");
const app = express();
app.use(express.json());

module.exports = app;