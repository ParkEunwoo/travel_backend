import * as express from 'express';

const Travels = require('../../models/travel');

exports.myList = async (req: express.Request, res: express.Response) => {
    const { user_id } = req.body;
    
    await Travels.find({user_id}, (err: any, output:any) => {
        if(err) res.status(500).json({error: err});
        if(!output) res.status(404).json({erro: 'Not Found'});
        else{
            res.status(200).json(output);
        }
    }).exec();
}

exports.addTravel = async (req: express.Request, res: express.Response) => {
    const { user_id, name, place, start_date, end_date, category} = req.body;
    
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
    await travel.save((err: any) => {
        if(err) {
            res.status(500).json({error: err});
        }
    });
    res.json({"success":true});
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
    console.log(req.files[0].filename);
    
    res.json("성공?!?");
}

exports.writeDaily = async (req: express.Request & {images: MulterFile}, res: express.Response) => {
    //const { images } = req;
    const { token, spot } = req.body;
    const id = req.params.id;
    //const { id, day } = req.params;
    
    console.log(token, id);
    await Travels.findOneAndUpdate({token, records:  {$elemMatch: { "_id": id } }}, {$push:{spot}}, {records:  {$elemMatch: { "_id": id } }},(err: any, output: any) => {
        if(err) res.status(500).json({error: err});
        if(!output) res.status(404).json({error: 'Not Found'});
        else {
            console.log(output);
            res.status(200).json(output);
        }
    }).exec();


}
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