import * as express from 'express';

const Users = require('../../models/users');

exports.myList = async (req: express.Request, res: express.Response) => {
    const { token } = req.body;
    
    await Users.findOne({token}, (err, output) => {
        if(err) res.status(500).json({error: err});
        if(!output) res.status(404).json({erro: 'Not Found'});
        else{
            res.status(200).json(output.records);
        }
    }).exec();
}

exports.addTravel = async (req: express.Request, res: express.Response) => {
    const { token, place, start_date, end_date, category} = req.body;
    const records = {
        place,
        start_date,
        end_date,
        category,
        views: 0,
        daily: null
    };
    
    await Users.findOneAndUpdate({token}, {$push:{records}}, (err, output) => {
        if(err) res.status(500).json({error: err});
        if(!output) res.status(404).json({error: 'Not Found'});
        else {
            res.status(200).json(output.records);
        }
    }).exec();

}

export interface MulterFile {
    path: string // Available using `DiskStorage`.
    mimetype: string
    originalname: string
    size: number
    fieldname: string
    encoding: string
    destination: string
    filename: string
}

exports.imageTest = async (req: express.Request & {files: MulterFile}, res: express.Response) => {
    const exif = require('exif-parser');
    const fs = require('fs');
    const buffer = fs.readFileSync(__dirname+'/../../../'+req.files[0].path.replace(/\\/g, '/'));
    console.log(buffer);
    console.log("--------------------------");
    const parser = exif.create(buffer);
    console.log(parser);
    console.log("--------------------------");
    const result = parser.parse();
    console.log(result);

    console.log(JSON.stringify(result, null, 2));
    
    res.json("성공?!?");
}

exports.writeDaily = async (req: express.Request, res: express.Response) => {
}
/*
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