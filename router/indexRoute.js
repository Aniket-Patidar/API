const express = require('express');
const { createUser, login, channel, searchUser, channelList, sendMessage, homepage,about } = require('../controller/indexController');
const { validateCreateUser, validateSearchUser, validateCreateChannel, validateGetChannelList, validateAddMessage } = require('../utils/validator');
const router = express.Router();
router.get("/", homepage);
router.get("/about", about);
router.post("/create-user", validateCreateUser, createUser);
router.post("/channel", validateCreateChannel, channel);
router.get("/search-user", validateSearchUser, searchUser);
router.get("/channel-list", validateGetChannelList, channelList);
router.post("/send-message", validateAddMessage, sendMessage);
module.exports = router;