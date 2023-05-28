const mongoose = require("mongoose")

const UsersModel = new mongoose.Schema({
    username : String,
    password: String
}, {versionKey:false})

module.exports = mongoose.model("user", UsersModel)