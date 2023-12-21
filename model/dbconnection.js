const mongoose = require("mongoose");

const url = "mongodb+srv://aniketpatidar76:aniketpatidar76@cluster0.dndifal.mongodb.net/?retryWrites=true&w=majority"


exports.databaseConnect = async () => {

    try {
        mongoose.connect(url)
        console.log("database connected");
    } catch (err) {
        console.log(err.message);
    }
}