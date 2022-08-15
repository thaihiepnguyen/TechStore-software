const express = require("express")
const path = require("path")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const Router = require("./controllers/user.controllers.js")
const PORT = 3000

mongoose.connect('mongodb://127.0.0.1:27017/test');

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

const app = express()
app.use(Router)
app.use('/',express.static(path.join(__dirname, 'view')))
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'view/signup.html'));
});
app.use(bodyParser.json())
app.use(express.json())

app.listen(PORT, ()=> {
    
  console.log('Server is up at 3000')
})