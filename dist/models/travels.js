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
const Travels = new Schema({
    user_id: String,
    name: String,
    title: String,
    place: String,
    register_date: { type: Date, default: Date.now },
    start_date: String,
    end_date: String,
    category: String,
    like: [],
    image: Image
});
module.exports = mongoose.model('Travels', Travels);
//# sourceMappingURL=travels.js.map