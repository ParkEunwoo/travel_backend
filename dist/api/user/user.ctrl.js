"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Users = require('../../models/users');
const Travels = require('../../models/travels');
const Spots = require('../../models/spots');
exports.friendList = (req, res) => __awaiter(this, void 0, void 0, function* () {
    const { user_id } = req.params;
    yield Users.findOne({ _id: user_id }, { friends: true }, (err, output) => {
        if (err)
            res.status(500).json({ error: err });
        if (!output)
            res.status(200).json({ data: [] });
        else {
            res.status(200).json(output);
        }
    }).exec();
});
exports.addFriend = (req, res) => __awaiter(this, void 0, void 0, function* () {
    const { user_id, friend_id } = req.body;
    yield Users.findOneAndUpdate({ _id: user_id }, { $addToSet: { friends: friend_id } }, (err, output) => {
        if (err)
            res.status(500).json({ error: err });
        if (!output)
            res.status(404).json({ error: 'Not Found' });
        else {
            res.status(200).json(output);
        }
    }).exec();
});
exports.deleteFriend = (req, res) => __awaiter(this, void 0, void 0, function* () {
    const { user_id } = req.body;
    const { friend } = req.params;
    console.log(friend);
    yield Users.findOneAndUpdate({ _id: user_id }, { $pull: { friends: { $elemMatch: friend } } }, (err, output) => {
        if (err)
            res.status(500).json({ error: err });
        if (!output)
            res.status(404).json({ error: 'Not Found' });
        else {
            res.status(200).json({ success: "Success" });
        }
    }).exec();
});
exports.friendsTravelList = (req, res) => __awaiter(this, void 0, void 0, function* () {
    const { friends } = req.body;
    console.log(friends);
    yield Travels.find({ user_id: { $in: friends } }, (err, output) => {
        if (err)
            res.status(500).json({ error: err });
        if (!output) {
            console.log('aa');
            res.status(200).json({ error: 'Not Found' });
        }
        else {
            res.status(200).json(output);
        }
    }).exec();
});
exports.friendTravelList = (req, res) => __awaiter(this, void 0, void 0, function* () {
    const { friend } = req.params;
    yield Travels.find({ user_id: friend }, (err, output) => {
        if (err)
            res.status(500).json({ error: err });
        if (!output)
            res.status(404).json({ error: 'Not Found' });
        else {
            res.status(200).json(output);
        }
    }).exec();
});
exports.modifyProfile = (req, res) => __awaiter(this, void 0, void 0, function* () {
    const file = req.file;
    const profile = {
        path: file.path,
        name: file.filename.split('.')[0],
        ext: file.filename.split('.')[1],
        uri: 'https://pic-me-back.herokuapp.com/images/profile/' + file.filename
    };
    const { user_id, name, introduct } = req.body;
    yield Users.findOneAndUpdate({ _id: user_id }, { name, profile, introduct }, (err, output) => {
        if (err)
            res.status(500).json({ error: err });
        if (!output)
            res.status(404).json({ error: 'Not Found' });
        else {
            res.status(200).json(output);
        }
    }).exec();
});
exports.myInfo = (req, res) => __awaiter(this, void 0, void 0, function* () {
    const { user_id } = req.params;
    console.log(user_id);
    yield Users.findOne({ _id: user_id }, (err, output) => {
        if (err)
            res.status(500).json({ error: err });
        if (!output)
            res.status(404).json({ error: 'Not Found' });
        else {
            res.status(200).json(output);
        }
    }).exec();
});
exports.login = (req, res) => __awaiter(this, void 0, void 0, function* () {
    const { token } = req.body;
    yield Users.findOne({ token }, (err, output) => {
        if (err)
            res.status(500).json({ error: err });
        if (!output)
            res.status(404).json({ error: 'Not Found' });
        else {
            res.status(200).json(output);
        }
    }).exec();
});
exports.signup = (req, res) => __awaiter(this, void 0, void 0, function* () {
    const file = req.file;
    console.log(file);
    const profile = {
        path: file.path,
        name: file.filename.split('.')[0],
        ext: file.filename.split('.')[1],
        uri: 'https://pic-me-back.herokuapp.com/images/profile/' + file.filename
    };
    const { token, name, introduct } = req.body;
    yield Users.create({
        token,
        name,
        introduct,
        profile,
        friends: []
    }, (err, output) => {
        if (err)
            res.status(500).json({ error: err });
        if (!output)
            res.status(404).json({ error: "Error" });
        else {
            res.status(200).json(output);
        }
    });
});
//# sourceMappingURL=user.ctrl.js.map