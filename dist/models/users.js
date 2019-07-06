"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const { Schema } = mongoose;
const Member = new Schema({
    name: String,
    number: Number,
    phone: String
});
const Activity = new Schema({
    week: Number,
    title: String,
    content: String,
    date: Date
});
const Recruitment = new Schema({
    type: String,
    title: String,
    leader: String,
    explain: String,
    period: {
        startDate: String,
        endDate: String
    },
    recruitNum: Number,
    joinNum: Number,
    member: [Member],
    activity: [Activity]
});
module.exports = mongoose.model('Recruitment', Recruitment);
//# sourceMappingURL=users.js.map