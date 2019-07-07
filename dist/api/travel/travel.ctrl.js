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
const Travels = require('../../models/travel');
exports.myList = (req, res) => __awaiter(this, void 0, void 0, function* () {
    const { user_id } = req.body;
    yield Travels.find({ user_id }, (err, output) => {
        if (err)
            res.status(500).json({ error: err });
        if (!output)
            res.status(404).json({ erro: 'Not Found' });
        else {
            res.status(200).json(output);
        }
    }).exec();
});
exports.addTravel = (req, res) => __awaiter(this, void 0, void 0, function* () {
    const { user_id, name, place, start_date, end_date, category } = req.body;
    const travel = new Travels({
        user_id,
        name,
        place,
        start_date,
        end_date,
        category,
        views: 0,
        daily: null
    });
    yield travel.save((err) => {
        if (err) {
            res.status(500).json({ error: err });
        }
    });
    res.json({ "success": true });
});
exports.imageTest = (req, res) => __awaiter(this, void 0, void 0, function* () {
    console.log(req.files[0].filename);
    res.json("성공?!?");
});
exports.writeDaily = (req, res) => __awaiter(this, void 0, void 0, function* () {
    //const { images } = req;
    const { token, spot } = req.body;
    const id = req.params.id;
    //const { id, day } = req.params;
    console.log(token, id);
    yield Travels.findOneAndUpdate({ token, records: { $elemMatch: { "_id": id } } }, { $push: { spot } }, { records: { $elemMatch: { "_id": id } } }, (err, output) => {
        if (err)
            res.status(500).json({ error: err });
        if (!output)
            res.status(404).json({ error: 'Not Found' });
        else {
            console.log(output);
            res.status(200).json(output);
        }
    }).exec();
});
/*

exports.signup = async (req, res) => {
    const { name, number, id, password, phone } = req.body;

    const user = new User({
        name, number, id, password, phone,
        rank: 0,
    });
    console.log(user);
    await user.save((err) => {
        if(err) {
            res.status(500).json({error: err});
        }
    });
    res.json({"success":true});
};

exports.regist = async (req, res) => {
    const { week, title, content } = req.body;
    const _id = req.params.id;
    const activity = {
        week,
        title,
        content,
        date: new Date()
    }
    if(leader){
        await Recruitment.findOneAndUpdate({_id}, {$addToSet:{activity}}, (err, user) => {
            if(err) res.status(500).json({error: err});
            if(!user) res.status(404).json({error: 'Not Found'});
            else res.status(200).json(user);
        }).exec();
        
    }
    else{
        res.json({login: '로그인안됨'});
    }
};
exports.statusMember = async (req: express.Request, res: express.Response) => {
   
    const number = req.params.id;

    console.log(number);
    await Recruitment.find( { member: { $elemMatch: { number } } } , (err, output) => {
        if(err) res.status(500).json({error: err});
        if(!output) res.status(404).json({error: 'Not Found'});
        else{
            res.status(200).json(output);
            console.log(output);
        }
    }).exec();
};
exports.statusLeader = async (req, res) => {

    const leader = req.params.id;

    console.log(leader);
    await Recruitment.find( {leader}  , (err, output) => {
        if(err) res.status(500).json({error: err});
        if(!output) res.status(404).json({error: 'Not Found'});
        else{
            res.status(200).json(output);
            console.log(output);
        }
    }).exec();
};

exports.regist = async (req, res) => {
    const { week, title, content } = req.body;
    const _id = req.params.id;
    const activity = {
        week,
        title,
        content,
        date: new Date()
    }
    if(leader){
        await Recruitment.findOneAndUpdate({_id}, {$addToSet:{activity}}, (err, user) => {
            if(err) res.status(500).json({error: err});
            if(!user) res.status(404).json({error: 'Not Found'});
            else res.status(200).json(user);
        }).exec();
        
    }
    else{
        res.json({login: '로그인안됨'});
    }
};

exports.member = async (req, res) => {

    const _id = req.params.id;
    await Recruitment.findOne({_id}, {member:true}, (err, user) => {
        if(err) res.status(500).json({error: err});
        if(!user) res.status(404).json({error: 'Not Found'});
        else {res.status(200).json(user);}
        console.log(user);
    }).exec();

};

exports.week = async (req, res) => {

    const _id = req.params.id;
    await Recruitment.findOne({_id}, {activity:true}, (err, user) => {
        if(err) res.status(500).json({error: err});
        if(!user) res.status(404).json({error: 'Not Found'});
        else {res.status(200).json(user);}
        console.log(user);
    }).exec();

};

*/ 
//# sourceMappingURL=travel.ctrl.js.map