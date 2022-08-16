const mongoose = require('mongoose')
const sessionSchema = new mongoose.Schema({
    name: String,
    products: Array,
})

module.exports = mongoose.model("Sessions", sessionSchema, 'sessionschema');