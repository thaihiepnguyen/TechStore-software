const Product = require("../controllers/product.controllers")
const express = require("express")
const bodyParser = require("body-parser")
const router = express.Router()
const upload = require("../middleware/product.upload")

router.post('/add-product',bodyParser.urlencoded({extended:true}) , upload.single('file'), Product.addProduct)
router.get('/products', Product.getAllProducts)
router.get('/get-product-by-type', bodyParser.json(),Product.getProducts)

module.exports = router
