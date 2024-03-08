const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: String,
    phone: Number,
    email: String
})

module.exports = mongoose.model('User', userSchema);