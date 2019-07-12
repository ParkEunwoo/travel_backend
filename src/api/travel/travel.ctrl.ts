import * as express from 'express';
import * as fs from 'fs';

const Travels = require('../../models/travels');

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