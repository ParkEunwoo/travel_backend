import * as express from 'express';

const Users = require('../../models/users');
const Travels = require('../../models/travels');
const Spots = require('../../models/spots');

exports.friendList = async (req: express.Request, res: express.Response) => {
    const { user_id } = req.params;
    
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
    const { friends } = req.body;
    console.log(friends)
    await Travels.find({user_id:{$in:friends}}, (err: any, output:any) => {
        if(err) res.status(500).json({error: err});
        if(!output){
            console.log('aa')
             res.status(404).json({error: 'Not Found'});}
        else{
            res.status(200).json(output);
        }
    }).exec();

}

exports.friendTravelList = async (req: express.Request, res: express.Response) => {

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

    const profile = {
        path: file.path,
        name: file.filename.split('.')[0],
        ext: file.filename.split('.')[1],
        uri: 'https://pic-me-back.herokuapp.com/images/profile/'+file.filename
    };  
    
    const { user_id, name, introduct } = req.body;


    await Users.findOneAndUpdate({_id: user_id}, {name, profile, introduct}, (err: any, output: any) => {
        if(err) res.status(500).json({error: err});
        if(!output) res.status(404).json({error: 'Not Found'});
        else {
            res.status(200).json(output);
        }
    }).exec();

}


exports.myInfo = async (req: express.Request, res: express.Response) => {
    const { user_id } = req.params;
    
    await Users.findOne({_id:user_id}, (err: any, output:any) => {
        if(err) res.status(500).json({error: err});
        if(!output) res.status(404).json({error: 'Not Found'});
        else{
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


exports.signup = async (req: any, res: express.Response) => {
    const file = req.file;
    console.log(file);
    const profile = {
        path: file.path,
        name: file.filename.split('.')[0],
        ext: file.filename.split('.')[1],
        uri: 'https://pic-me-back.herokuapp.com/images/profile/'+file.filename
    };  

    const { token, name, introduct } = req.body;

    await Users.create({
        token,
        name,
        introduct,
        profile,
        friends:[]
    }, (err:any, output: any) => {
        if (err) res.status(500).json({error: err});
        if(!output) res.status(404).json({error: "Error"});
        else {
            res.status(200).json(output);
        }
    });
}