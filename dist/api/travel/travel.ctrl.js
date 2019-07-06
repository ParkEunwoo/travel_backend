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
const Recruitment = require('models/recruitment');
exports.statusMember = (req, res) => __awaiter(this, void 0, void 0, function* () {
    const number = req.params.id;
    console.log(number);
    yield Recruitment.find({ member: { $elemMatch: { number } } }, (err, output) => {
        if (err)
            res.status(500).json({ error: err });
        if (!output)
            res.status(404).json({ error: 'Not Found' });
        else {
            res.status(200).json(output);
            console.log(output);
        }
    }).exec();
});
exports.statusLeader = (req, res) => __awaiter(this, void 0, void 0, function* () {
    const leader = req.params.id;
    console.log(leader);
    yield Recruitment.find({ leader }, (err, output) => {
        if (err)
            res.status(500).json({ error: err });
        if (!output)
            res.status(404).json({ error: 'Not Found' });
        else {
            res.status(200).json(output);
            console.log(output);
        }
    }).exec();
});
exports.regist = (req, res) => __awaiter(this, void 0, void 0, function* () {
    const { week, title, content } = req.body;
    const _id = req.params.id;
    const activity = {
        week,
        title,
        content,
        date: new Date()
    };
    if (leader) {
        yield Recruitment.findOneAndUpdate({ _id }, { $addToSet: { activity } }, (err, user) => {
            if (err)
                res.status(500).json({ error: err });
            if (!user)
                res.status(404).json({ error: 'Not Found' });
            else
                res.status(200).json(user);
        }).exec();
    }
    else {
        res.json({ login: '로그인안됨' });
    }
});
exports.member = (req, res) => __awaiter(this, void 0, void 0, function* () {
    const _id = req.params.id;
    yield Recruitment.findOne({ _id }, { member: true }, (err, user) => {
        if (err)
            res.status(500).json({ error: err });
        if (!user)
            res.status(404).json({ error: 'Not Found' });
        else {
            res.status(200).json(user);
        }
        console.log(user);
    }).exec();
});
exports.week = (req, res) => __awaiter(this, void 0, void 0, function* () {
    const _id = req.params.id;
    yield Recruitment.findOne({ _id }, { activity: true }, (err, user) => {
        if (err)
            res.status(500).json({ error: err });
        if (!user)
            res.status(404).json({ error: 'Not Found' });
        else {
            res.status(200).json(user);
        }
        console.log(user);
    }).exec();
});
//# sourceMappingURL=travel.ctrl.js.map