const mongoose = require("mongoose");

let itemsSchema = new mongoose.Schema({
    id:Number,
    name: String,
    price: Number,
    desc: String
})

module.exports = mongoose.model("items", itemsSchema);