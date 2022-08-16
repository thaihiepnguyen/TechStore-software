const Product = require("../models/product.models")

//CREATE PRODUCT
module.exports.addProduct = async function(req, res, next) {
  try {
    const product = new Product({
      productname: req.body.productname,
      type: req.body.type,
      price: Number(req.body.price),
      file: req.file.path,
      qty: Number(req.body.qty),
      description: req.body.description
    })
    const result = await Product.create(product)
    res.status(201).send("Up Product Successfully!")
  } catch(error) {
    res.status(500).send(error)
  }
}
//get a Product by type
// link with FE: need a form with method GET and action: /get-product-by-type

//error!!!
module.exports.getProducts = async function (req, res, next) {
  try {
    const cursor = await Product.find(req.body).exec()
    let productInfo = []
    cursor.forEach(doc => {
            productInfo.push({
              productname: doc.productname,
              type: doc.type,
              price: doc.price,
              file: doc.file,
              qty: doc.qty,
              description: doc.description
            })
          })
    res.status(200).json(productInfo);
    } catch (error) {
    res.status(500).send(error);
    }
};

//GET ALL PRODUCT
module.exports.getAllProducts = async function (req, res, next) {
  try {
    const cursor = await Product.find({}).exec()
    let productInfo = []
    cursor.forEach(doc => {
            productInfo.push({
              productname: doc.productname,
              type: doc.type,
              price: doc.price,
              file: doc.file,
              qty: doc.qty,
              description: doc.description
            })
          })
    res.status(200).json(productInfo);
    } catch (error) {
    res.status(500).send(error);
    }
};

// //Remove Product
// app.delete('/remove-product', async (res,req)=> {

//     const pd = await Product.find({name: req.body.productId});
//     await Product.delete(pd)

//   })

// module.exports = app
