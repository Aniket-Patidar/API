const mongoose = require('mongoose');

const channelSchema = new mongoose.Schema({

    channelUser: [{
        email: { type: String, default: "" },
        name: { type: String, default: "" },
        profilePic: { type: String, default: "" }
    }
    ],

    message: [
        {
            sendEmail: { type: String, default: "" },
            messageType: { type: String, default: "TEXT" },
            text: { type: String, default: "" },
            addedOn: { type: Number, default: Date.now() },
        }
    ],
    addedOn: { type: Number, default: Date.now() },
}, { timestamps: true })

module.exports = mongoose.model('channel', channelSchema);