const mongoose = require("mongoose");

let usersSchema = new mongoose.Schema({
    name: String,
    age: Number,
    address: String,
    email: String,
    password: String
})

module.exports = mongoose.model("users", usersSchema);