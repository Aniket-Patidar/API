const userMode = require("../model/user");
const ChannelModel = require("../model/channel");
const { sendResponse, sendError } = require("../utils");

exports.homepage = async (req, res) => {
    res.send("homepage");
}


/*Douts  */
exports.channel = async (req, res) => {
    const channelUsers = req.body.channelUsers;
    const firstUser = channelUsers[0];
    const secondUser = channelUsers[1];
    let isChannelAlreadyExist = false;
    let channelModel;

    const channelList = await ChannelModel.find({
        "channelUsers.email": firstUser.email,
    });

    if (channelList && channelList.length) {
        channelList.forEach((channel) => {
            isChannelAlreadyExist = channel.channelUsers.find(
                (user) => user.email === secondUser.email
            );
            if (isChannelAlreadyExist)
                channelModel = channel
        });
    }
    if (isChannelAlreadyExist)
        return sendResponse(res, channelModel, "Channel created successfully", true, 200);

    channelModel = new ChannelModel({
        channelUser: channelUsers,
        message: []
    });
    await channelModel.save();
    sendResponse(res, channelModel, "Channel created successfully", true, 200);
}


exports.createUser = async (req, res) => {
    const requestData = req.body;
    const isUserExist = await userMode.findOne({ email: requestData.email });
    if (isUserExist) return sendResponse(res, isUserExist, "user fetched successfully", true, 200);

    const user = new userMode(req.body);
    await user.save();
    sendResponse(res, user, "user created successfully", true, 200);

}

exports.channelList = async (req, res) => {
    const requestData = req.query;
    const channelList = await ChannelModel.find({ "channelUser.email": requestData.email });
    sendResponse(res, channelList, "Channel list fetched", true, 200);
}

exports.searchUser = async (req, res) => {
    const requestData = req.query;
    const isUserExist = await userMode.findOne({ email: requestData.email })
    if (!isUserExist) return sendError(res, {}, "No user found!");
    sendResponse(res, isUserExist, "user found successfully", true, 200);
}

exports.sendMessage = async (req, res) => {
    const requestData = req.body;
    await ChannelModel.findOneAndUpdate({ _id: requestData.channelId }, { $push: { message: requestData.message } })
    sendResponse(res, {}, "message send successfully", true, 200);
}