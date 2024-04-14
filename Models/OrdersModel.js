const mongoose = require("mongoose");

let ordersSchema = new mongoose.Schema({
    id:Number,
    totalPrice: Number,
    items: Array
})

module.exports = mongoose.model("orders", ordersSchema);