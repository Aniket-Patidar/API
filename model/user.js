const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, default: "" },
    email: { type: String, default: "" },
    profilePic: { type: String, default: "" },
    addedOn: { type: Number, default: Date.now() },
}, { timestamps: true })

module.exports = mongoose.model('User', userSchema);