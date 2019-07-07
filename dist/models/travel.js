"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const { Schema } = mongoose;
const Image = new Schema({
    path: String,
    name: String,
    ext: String
});
const Spot = new Schema([{
        images: [Image],
        latitude: Number,
        longitude: Number,
        time: String,
        content: String
    }]);
const Travels = new Schema({
    user_id: String,
    name: String,
    place: String,
    start_date: String,
    end_date: String,
    category: String,
    views: Number,
    daily: [Spot]
});
module.exports = mongoose.model('Travels', Travels);
//# sourceMappingURL=travel.js.map