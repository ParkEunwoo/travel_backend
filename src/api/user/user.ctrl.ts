import * as express from 'express';
import * as fs from 'fs';

const Users = require('../../models/users');

exports.friendList = async (req: express.Request, res: express.Response) => {
    const { user_id } = req.body;
    
    await Users.find({user_id}, {friends: true}, (err: any, output:any) => {
        if(err) res.status(500).json({error: err});
        if(!output) res.status(404).json({error: 'Not Found'});
        else{
            res.status(200).json(output);
        }
    }).exec();
}

exports.addTravel = async (req: express.Request, res: express.Response) => {
    const { user_id, name, place, start_date, end_date, category} = req.body;

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
}


exports.writeDaily = async (req: any, res: express.Response) => {
    const files = req.files;
    /*
    const { spot_length } = req.body;
    const spot = spot_length.split(',').map(Number);
    console.log(spot);
    console.log(files);
    
*/
/*
    const files = [
        {
            path: "public/images/travel/5d25bfeb02d8ac42c4b053f6/1562755329921.png",
            filename: "1562755329921",
            ext: "png"
        },
        {
            path: "public/images/travel/5d25bfeb02d8ac42c4b053f6/1562755329926.png",
            filename: "1562755329926",
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
    const images = files.map((value) => {
        return {
            path: value.path,
            name: value.filename.split('.')[0],
            ext: value.filename.split('.')[1]
        }
    });
    
    const { user_id, spots, length } = req.body;
    let sum = 0;
    spots.forEach((value, index) => {
        value.images = images.slice(sum, sum+=length[index]);
    });
    
    const { _id, day } = req.params;
    const daily = {
        day: Number(day),
        spots
    };
    
    await Travels.findOneAndUpdate({user_id, _id}, {$addToSet:{daily}}, (err: any, output: any) => {
        if(err) res.status(500).json({error: err});
        if(!output) res.status(404).json({error: 'Not Found'});
        else {
            res.status(200).json(output);
        }
    }).exec();

}

exports.showTravel = async (req: express.Request, res: express.Response) => {
    const { user_id } = req.body;
    const { _id } = req.params;
    
    await Travels.findOne({user_id, _id}, (err: any, output:any) => {
        if(err) res.status(500).json({error: err});
        if(!output) res.status(404).json({error: 'Not Found'});
        else{
            res.status(200).json(output);
        }
    }).exec();
}

exports.modifyDaily = async (req: any, res: express.Response) => {
    //const files = req.files;
    /*
    const { spot_length } = req.body;
    const spot = spot_length.split(',').map(Number);
    console.log(spot);
    console.log(files);
    
*/const files = [
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
];
    const images = files.map((value) => {
        return {
            path: value.path,
            name: value.filename.split('.')[0],
            ext: value.filename.split('.')[1]
        }
    });
    
    const { user_id, spots, length } = req.body;
    let sum = 0;
    spots.forEach((value, index) => {
        value.images = images.slice(sum, sum+=length[index]);
    });
    
    const { _id, day } = req.params;
    const daily = {
        day: Number(day),
        spots
    };

    await Travels.update({user_id, _id, daily:{day}}, {"daily.0": daily}, (err: any, output: any) => {
        if(err) res.status(500).json({error: err});
        if(!output) res.status(404).json({error: 'Not Found'});
        else {
            console.log(output)
            res.status(200).json(output);
        }
    }).exec();

}

exports.deleteTravel = async (req: express.Request, res: express.Response) => {
    const { user_id } = req.body;
    const { _id } = req.params;
    
    await Travels.deleteOne({user_id, _id}, (err: any, output:any) => {
        if(err) res.status(500).json({error: err});
        if(!output) res.status(404).json({error: 'Not Found'});
        else{
            res.status(200).json({success: "Success"});
        }
    }).exec();
}

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
