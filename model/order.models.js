const mongoose = require("mongoose")

const OrderSchema = new mongoose.Schema (
    {
        user: {type: Schema.Types.ObjectId, ref: 'Account'},
        cart: {type: Object, required: true},
        addresses: { type:String, required: true},
        name: {type: String, required: true},
        paymentId: {type: String, required: true}
    },
    {      
        collection: "Order"                                                                  
    }
)

const model = mongoose.model('OrderSchema', OrderSchema)

module.exports = model