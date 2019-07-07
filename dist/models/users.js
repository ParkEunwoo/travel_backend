"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const { Schema } = mongoose;
const Friend = new Schema({
    friend_id: String
});
const Image = new Schema({
    path: String,
    name: String,
    ext: String
});
const Users = new Schema({
    token: String,
    name: String,
    profile: Image,
    friends: [Friend]
});
module.exports = mongoose.model('Users', Users);
//# sourceMappingURL=users.js.map