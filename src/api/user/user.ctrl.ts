import * as express from 'express';
import * as fs from 'fs';

const Users = require('../../models/users');
const Travels = require('../../models/travel');
const Spots = require('../../models/spots');

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
    await Users.findOneAndUpdate({_id:user_id}, {$pull:{friends:{$elemMatch:friend}}}, (err: any, output:any) => {
        if(err) res.status(500).json({error: err});
        if(!output) res.status(404).json({error: 'Not Found'});
        else{
            res.status(200).json({success: "Success"});
        }
    }).exec();
}


exports.friendsTravelList = async (req: express.Request, res: express.Response) => {
    const { user_id, friends } = req.body;
    
    await Travels.find({user_id:{$in:friends}}, (err: any, output:any) => {
        if(err) res.status(500).json({error: err});
        if(!output) res.status(404).json({error: 'Not Found'});
        else{
            res.status(200).json(output);
        }
    }).exec();

}

exports.friendTravelList = async (req: express.Request, res: express.Response) => {
    const { user_id } = req.body;
    const { friend } = req.params;
    
    await Travels.find({user_id: friend}, (err: any, output:any) => {
        if(err) res.status(500).json({error: err});
        if(!output) res.status(404).json({error: 'Not Found'});
        else{
            res.status(200).json(output);
        }
    }).exec();

}


exports.modifyProfile = async (req: any, res: express.Response) => {
    const file = req.file;
    /*
    const { spot_length } = req.body;
    const spot = spot_length.split(',').map(Number);
    console.log(spot);
    console.log(files);
    
const files = [
    {
        path: "public/images/travel/5d25bfeb02d8ac42c4b053f6/1562755329921.png",
        filename: "1562755329921",
        ext: "png"
    },
    {
        path: "public/images/travel/5d25bfeb02d8ac42c4b053f6/1562755329933.png",
        filename: "1562755329933",
        ext: "png"
    },
    {
        path: "public/images/travel/5d25bfeb02d8ac42c4b053f6/1562755329937.png",
        filename: "1562755329937",
        ext: "png"
    }
];*/
    const profile = {
        path: file.path,
        name: file.filename.split('.')[0],
        ext: file.filename.split('.')[1]
    };  
    
    const { user_id, name } = req.body;


    await Users.findOneAndUpdate({_id: user_id}, {name, profile}, (err: any, output: any) => {
        if(err) res.status(500).json({error: err});
        if(!output) res.status(404).json({error: 'Not Found'});
        else {
            res.status(200).json(output);
        }
    }).exec();

}


exports.login = async (req: express.Request, res: express.Response) => {
    const { token } = req.body;
    
    await Users.findOne({token}, (err: any, output:any) => {
        if(err) res.status(500).json({error: err});
        if(!output) res.status(404).json({error: 'Not Found'});
        else{
            res.status(200).json(output);
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