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
const Travels = require('../../models/travels');
exports.title = (req, res) => __awaiter(this, void 0, void 0, function* () {
    const { key } = req.body;
    yield Travels.find({ title: { $regex: key } }, (err, output) => {
        if (err)
            res.status(500).json({ error: err });
        if (!output)
            res.status(404).json({ error: 'Not Found' });
        else {
            res.status(200).json(output);
        }
    }).exec();
});
exports.place = (req, res) => __awaiter(this, void 0, void 0, function* () {
    const { key } = req.body;
    yield Travels.find({ place: { $regex: key } }, (err, output) => {
        if (err)
            res.status(500).json({ error: err });
        if (!output)
            res.status(404).json({ error: 'Not Found' });
        else {
            res.status(200).json(output);
        }
    }).exec();
});
//# sourceMappingURL=search.ctrl.js.map