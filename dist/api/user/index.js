"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const multer = require("multer");
const userCtrl = require('./user.ctrl');
const user = express.Router();
user.use(express.json());
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'public/images/profile/' + req.body._id);
    },
    filename: (req, file, callback) => {
        callback(null, new Date().valueOf() + '.' + file.mimetype.split('/')[1]);
    }
});
const upload = multer({ storage }).single('file');
user.get('/friends', userCtrl.friendList);
user.post('/friends', userCtrl.addFriend);
user.delete('/friends/:friend', userCtrl.deleteFriend);
user.get('/friends/travel', userCtrl.friendsTravelList);
user.get('/friends/:friend/travel', userCtrl.friendTravelList);
user.put('/profile', upload, userCtrl.modifyProfile);
user.post('/auth/signup', userCtrl.signup);
user.get('/auth/login', upload, userCtrl.login);
module.exports = user;
//# sourceMappingURL=index.js.map