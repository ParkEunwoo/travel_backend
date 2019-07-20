"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const { Schema } = mongoose;
const Travels = new Schema({
    user_id: String,
    name: String,
    title: String,
    place: String,
    register_date: { type: Date, default: Date.now },
    start_date: String,
    end_date: String,
    category: String,
    like: []
});
module.exports = mongoose.model('Travels', Travels);
//# sourceMappingURL=travels.js.map