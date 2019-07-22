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
const Spots = new Schema({
    user_id: String,
    travel_id: String,
    day: Number,
    images: [Image],
    latitude: Number,
    longitude: Number,
    time: String,
    content: String
});
module.exports = mongoose.model('Spots', Spots);
//# sourceMappingURL=spots.js.map