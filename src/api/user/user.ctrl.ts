import * as express from 'express';
import * as fs from 'fs';

const Users = require('../../models/users');
const Travels = require('../../models/travel');

exports.friendList = async (req: express.Request, res: express.Response) => {
    const { user_id } = req.body;
    
    await Users.findOne({_id: user_id}, {friends: true}, (err: any, output:any) => {
        if(err) res.status(500).json({error: err});
        if(!output) res.status(404).json({error: 'Not Found'});
        else{
            res.status(200).json(output);
        }
    }).exec();
}

exports.addFriend = async (req: any, res: express.Response) => {
    
    const { user_id, friend_id } = req.body;
    
    await Users.findOneAndUpdate({_id: user_id}, {$addToSet:{friends:friend_id}}, (err: any, output: any) => {
        if(err) res.status(500).json({error: err});
        if(!output) res.status(404).json({error: 'Not Found'});
        else {
            res.status(200).json(output);
        }
    }).exec();

}
exports.deleteFriend = async (req: express.Request, res: express.Response) => {
    const { user_id } = req.body;
    const { friend } = req.params;
    console.log(friend);
    await Users.updateOne({_id:user_id}, {$pull:{friends:{$elemMatch:friend}}}, (err: any, output:any) => {
        if(err) res.status(500).json({error: err});
        if(!output) res.status(404).json({error: 'Not Found'});
        else{
            res.status(200).json({success: "Success"});
        }
    }).exec();
}


exports.friendsTravelList = async (req: express.Request, res: express.Response) => {
    const { user_id } = req.body;
    let friends = [];
    
    await Users.findOne({user_id}, {friends: true}, (err: any, output:any) => {
        if(err) res.status(500).json({error: err});
        if(!output) res.status(404).json({error: 'Not Found'});
        else{
            friends = output;
        }
    }).exec();

}

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