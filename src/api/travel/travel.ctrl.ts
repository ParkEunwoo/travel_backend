import * as express from 'express';
import * as fs from 'fs';

const Travels = require('../../models/travels');
const Spots = require('../../models/spots');

exports.myList = async (req: express.Request, res: express.Response) => {
    const { user_id } = req.body;
    
    console.log(req);
    await Travels.find({user_id}, (err: any, output:any) => {
        if(err) res.status(500).json({error: err});
        if(!output) res.status(404).json({error: 'Not Found'});
        else{
            res.status(200).json(output);
        }
    }).exec();
}

exports.addTravel = async (req: any, res: express.Response) => {
    const file = req.file;
    console.log(file);
    const image = {
        path: file.path,
        name: file.filename.split('.')[0],
        ext: file.filename.split('.')[1],
        uri: 'https://pic-me-back.herokuapp.com/images/profile/'+file.filename
    };  

    const { user_id, name, title, place, start_date, end_date, category} = req.body;

    await Travels.create({
        user_id,
        name,
        title,
        place,
        start_date,
        end_date,
        category,
        image}, (err:any, output: any) => {
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


exports.writeSpot = async (req: any, res: express.Response) => {
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
    
    const { user_id, content, time, latitude, longitude } = req.body;
    
    const { travel_id, day } = req.params;
    await Spots.create({
        user_id,
        travel_id,
        day,
        images,
        latitude,
        longitude,
        time,
        content
        }, (err:any, output: any) => {
        if (err) res.status(500).json({error: err});
        if(!output) res.status(404).json({error: "Error"});
        else {
            res.status(200).json(output);
        }
    });
}

exports.showTravel = async (req: express.Request, res: express.Response) => {
    const { user_id } = req.body;
    const { travel_id } = req.params;
    
    await Spots.find({travel_id}, (err: any, output:any) => {
        if(err) res.status(500).json({error: err});
        if(!output) res.status(404).json({error: 'Not Found'});
        else{
            res.status(200).json(output);
        }
    }).sort({day: 1, time: 1}).exec();
}

exports.modifySpot = async (req: any, res: express.Response) => {
    const files = req.files;
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
    const images = files.map((value) => {
        return {
            path: value.path,
            name: value.filename.split('.')[0],
            ext: value.filename.split('.')[1]
        }
    });
    
    const { user_id, content, time, latitude, longitude } = req.body;

    const { travel_id, day } = req.params;

    await Spots.findOneAndUpdate({user_id, travel_id, day}, {images, latitude, longitude, time, content}, (err: any, output: any) => {
        if(err) res.status(500).json({error: err});
        if(!output) res.status(404).json({error: 'Not Found'});
        else {
            res.status(200).json(output);
        }
    }).exec();

}

exports.deleteTravel = async (req: express.Request, res: express.Response) => {
    const { user_id } = req.body;
    const { _id } = req.params;
    
    const path = __dirname+"/../../../public/images/travel/"+_id;

    const deleteFolderRecursive = function(path) {
        if (fs.existsSync(path)) {
          fs.readdirSync(path).forEach(function(file, index){
            var curPath = path + "/" + file;
            if (fs.lstatSync(curPath).isDirectory()) { // recurse
              deleteFolderRecursive(curPath);
            } else { // delete file
              fs.unlinkSync(curPath);
            }
          });
          fs.rmdirSync(path);
        }
    };
    
    deleteFolderRecursive(path);

    await Travels.deleteOne({user_id, _id}, (err: any, output:any) => {
        if(err) res.status(500).json({error: err});
        if(!output) res.status(404).json({error: 'Not Found'});
        else{
            res.status(200).json({success: "Success"});
        }
    }).exec();
    
    await Spots.delete({user_id, travel_id:_id}, (err: any, output: any) => {
        if(err) res.status(500).json({error: err});
        if(!output) res.status(404).json({error: 'Not Found'});
        else{
            res.status(200).json({success: "Success"});
        }
    }).exec();
}


exports.likeTravel = async (req: express.Request, res: express.Response) => {
    const { user_id } = req.body;

    const { _id } = req.params;

    await Travels.findOneAndUpdate({_id}, {$addToSet:{like:user_id}}, (err: any, output: any) => {
        if(err) res.status(500).json({error: err});
        if(!output) res.status(404).json({error: 'Not Found'});
        else {
            res.status(200).json(output);
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
    const { travel_id } = req.params;
    
    await Spots.find({user_id, travel_id}, (err: any, output:any) => {
        if(err) res.status(500).json({error: err});
        if(!output) res.status(404).json({error: 'Not Found'});
        else{
            res.status(200).json(output);
        }
    }).sort({day: 1, time: 1}).exec();
}
