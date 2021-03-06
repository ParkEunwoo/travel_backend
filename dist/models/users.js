"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const { Schema } = mongoose;
const Image = new Schema({
    path: String,
    name: String,
    ext: String,
    uri: String
});
const Users = new Schema({
    token: String,
    name: String,
    profile: Image,
    introduct: String,
    friends: [String]
});
module.exports = mongoose.model('Users', Users);
//# sourceMappingURL=users.js.map