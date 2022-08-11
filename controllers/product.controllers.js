const express = require("express");
const bodyParser = require("body-parser")
const app = express();
const Product = require("../model/product.models")
app.use(bodyParser.json())

//create a product
app.post('/add_products', async (req,res) => {
    console.log(req.body)
  })

//get a Product
app.get("/get_product", async (req, res) => {
    const pd = await Product.find({name: req.body.name});
  
    try {
      response.send(pd);
    } catch (error) {
      response.status(500).send(error);
    }
  });

//Remove Product
app.delete('/remove_product', async (res,req)=> {

    const pd = await Product.find({name: req.body.productId});
    await Product.delete(pd)

  })

module.exports = app