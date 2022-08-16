const express = require("express")
const path = require("path")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const ProductRouter = require("./routers/product.routes")

const PORT = 3000

mongoose.connect('mongodb+srv://doananhduong:duong1234@cluster0.lgai80j.mongodb.net/?retryWrites=true&w=majority');

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

const app = express()
app.use('/',express.static(path.join(__dirname, 'views')))
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'views/product.html'));
});
app.use(ProductRouter)

app.listen(PORT, ()=> {
    
  console.log('Server is up at 3000')
})
