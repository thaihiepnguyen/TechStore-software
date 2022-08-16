const mongoose = require("mongoose")

const ProductSchema = new mongoose.Schema (
    {
        productname: {type: String, required: true, unique: true},
        type: {type: String, required: true},
        price: {type: Number, default: 0},
        file: {type: String, required: true},
        qty: {type: Number, required: true, default: 0},
        description: String
    }
)
const model = mongoose.model('Product', ProductSchema)

module.exports = model