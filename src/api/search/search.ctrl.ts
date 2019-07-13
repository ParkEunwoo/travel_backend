import * as express from 'express';

const Travels = require('../../models/travels');

exports.title = async (req: express.Request, res: express.Response) => {
    const { key } = req.body;
    
    await Travels.find({title: {$regex: key}}, (err: any, output:any) => {
        if(err) res.status(500).json({error: err});
        if(!output) res.status(404).json({error: 'Not Found'});
        else{
            res.status(200).json(output);
        }
    }).exec();
}

exports.place = async (req: express.Request, res: express.Response) => {
    const { key } = req.body;
    
    await Travels.find({place: {$regex: key}}, (err: any, output:any) => {
        if(err) res.status(500).json({error: err});
        if(!output) res.status(404).json({error: 'Not Found'});
        else{
            res.status(200).json(output);
        }
    }).exec();
}
