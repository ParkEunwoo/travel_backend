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
const Travels = require('../../models/travel');
exports.friendList = (req, res) => __awaiter(this, void 0, void 0, function* () {
    const { user_id } = req.body;
    yield Users.findOne({ _id: user_id }, { friends: true }, (err, output) => {
        if (err)
            res.status(500).json({ error: err });
        if (!output)
            res.status(404).json({ error: 'Not Found' });
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
    yield Users.updateOne({ _id: user_id }, { $pull: { friends: { $elemMatch: friend } } }, (err, output) => {
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
    const { user_id } = req.body;
    let friends = [];
    yield Users.findOne({ user_id }, { friends: true }, (err, output) => {
        if (err)
            res.status(500).json({ error: err });
        if (!output)
            res.status(404).json({ error: 'Not Found' });
        else {
            friends = output;
        }
    }).exec();
});
/*

exports.categoryList = async (req: express.Request, res: express.Response) => {
    const { user_id } = req.body;
    const { category } = req.params;

    await Travels.find({user_id, category}, (err: any, output:any) => {
        if(err) res.status(500).json({error: err});
        if(!output) res.status(404).json({error: 'Not Found'});
        else{
            res.status(200).json(output);
        }
    }).exec();
}

exports.showCategoryTravel = async (req: express.Request, res: express.Response) => {
    const { user_id } = req.body;
    const { category, _id } = req.params;
    
    await Travels.findOne({user_id, _id, category}, (err: any, output:any) => {
        if(err) res.status(500).json({error: err});
        if(!output) res.status(404).json({error: 'Not Found'});
        else{
            res.status(200).json(output);
        }
    }).exec();
}


exports.signup = async (req: express.Request, res: express.Response) => {
    const { user_id, friend_id} = req.body;

    await Travels.create({
        user_id,
        name,
        place,
        start_date,
        end_date,
        category,
        views: 0,
        daily: []}, (err:any, output: any) => {
        if (err) res.status(500).json({error: err});
        if(!output) res.status(404).json({error: "Error"});
        else {
            res.status(200).json(output);
            fs.mkdir(__dirname+'/../../../public/images/travel/'+output._id, { recursive: true }, (err) => {
                if (err) { throw err; }
            });
        }
    });
}*/ 
//# sourceMappingURL=user.ctrl.js.map