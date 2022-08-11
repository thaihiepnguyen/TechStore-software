const mongoose = require("mongoose")

const ProductSchema = new mongoose.Schema (
    {
        name: {type: String, required: true, unique: true},
        type: {type: String, required: true},
        detail: {type: String, required: true},
        rating : float,
        img: {
            data: Buffer,
            contentType: String
        }
    },
    {      
        collection: "Product"                                                                  
    }
)

const model = mongoose.model('ProductSchema', ProductSchema)

module.exports = model