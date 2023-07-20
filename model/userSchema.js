const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    acno: {
        type: Number,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    balance: {
        type: Number,
        required: true
    },
    transaction: {
        type: Array,
        required: true
    }
})


const users =mongoose.model("users",userSchema)

module.exports=users