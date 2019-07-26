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
const fs = require("fs");
const Travels = require('../../models/travels');
const Spots = require('../../models/spots');
exports.myList = (req, res) => __awaiter(this, void 0, void 0, function* () {
    const { user_id } = req.params;
    console.log(req);
    yield Travels.find({ user_id }, (err, output) => {
        if (err)
            res.status(500).json({ error: err });
        if (!output)
            res.status(404).json({ error: 'Not Found' });
        else {
            res.status(200).json(output);
        }
    }).exec();
});
exports.addTravel = (req, res) => __awaiter(this, void 0, void 0, function* () {
    const file = req.file;
    const image = {
        path: file.path,
        name: file.filename.split('.')[0],
        ext: file.filename.split('.')[1],
        uri: 'https://pic-me-back.herokuapp.com/images/travel/' + file.filename
    };
    const { user_id, name, title, place, start_date, end_date, category } = req.body;
    console.log('user_id', user_id);
    console.log('name', name);
    console.log('title', title);
    yield Travels.create({
        user_id,
        name,
        title,
        place,
        start_date,
        end_date,
        category,
        image
    }, (err, output) => {
        if (err)
            res.status(500).json({ error: err });
        if (!output)
            res.status(404).json({ error: "Error" });
        else {
            res.status(200).json(output);
            fs.mkdir(__dirname + '/../../../public/images/travel/' + output._id, { recursive: true }, (err) => {
                if (err) {
                    throw err;
                }
            });
        }
    });
});
exports.writeSpot = (req, res) => __awaiter(this, void 0, void 0, function* () {
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
        };
    });
    const { user_id, content, time, latitude, longitude } = req.body;
    const { travel_id, day } = req.params;
    yield Spots.create({
        user_id,
        travel_id,
        day,
        images,
        latitude,
        longitude,
        time,
        content
    }, (err, output) => {
        if (err)
            res.status(500).json({ error: err });
        if (!output)
            res.status(404).json({ error: "Error" });
        else {
            res.status(200).json(output);
        }
    });
});
exports.showTravel = (req, res) => __awaiter(this, void 0, void 0, function* () {
    const { user_id } = req.body;
    const { travel_id } = req.params;
    yield Spots.find({ travel_id }, (err, output) => {
        if (err)
            res.status(500).json({ error: err });
        if (!output)
            res.status(404).json({ error: 'Not Found' });
        else {
            res.status(200).json(output);
        }
    }).sort({ day: 1, time: 1 }).exec();
});
exports.modifySpot = (req, res) => __awaiter(this, void 0, void 0, function* () {
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
        };
    });
    const { user_id, content, time, latitude, longitude } = req.body;
    const { travel_id, day } = req.params;
    yield Spots.findOneAndUpdate({ user_id, travel_id, day }, { images, latitude, longitude, time, content }, (err, output) => {
        if (err)
            res.status(500).json({ error: err });
        if (!output)
            res.status(404).json({ error: 'Not Found' });
        else {
            res.status(200).json(output);
        }
    }).exec();
});
exports.deleteTravel = (req, res) => __awaiter(this, void 0, void 0, function* () {
    const { user_id } = req.body;
    const { _id } = req.params;
    const path = __dirname + "/../../../public/images/travel/" + _id;
    const deleteFolderRecursive = function (path) {
        if (fs.existsSync(path)) {
            fs.readdirSync(path).forEach(function (file, index) {
                var curPath = path + "/" + file;
                if (fs.lstatSync(curPath).isDirectory()) { // recurse
                    deleteFolderRecursive(curPath);
                }
                else { // delete file
                    fs.unlinkSync(curPath);
                }
            });
            fs.rmdirSync(path);
        }
    };
    deleteFolderRecursive(path);
    yield Travels.deleteOne({ user_id, _id }, (err, output) => {
        if (err)
            res.status(500).json({ error: err });
        if (!output)
            res.status(404).json({ error: 'Not Found' });
        else {
            res.status(200).json({ success: "Success" });
        }
    }).exec();
    yield Spots.delete({ user_id, travel_id: _id }, (err, output) => {
        if (err)
            res.status(500).json({ error: err });
        if (!output)
            res.status(404).json({ error: 'Not Found' });
        else {
            res.status(200).json({ success: "Success" });
        }
    }).exec();
});
exports.likeTravel = (req, res) => __awaiter(this, void 0, void 0, function* () {
    const { user_id } = req.body;
    const { _id } = req.params;
    yield Travels.findOneAndUpdate({ _id }, { $addToSet: { like: user_id } }, (err, output) => {
        if (err)
            res.status(500).json({ error: err });
        if (!output)
            res.status(404).json({ error: 'Not Found' });
        else {
            res.status(200).json(output);
        }
    }).exec();
});
exports.categoryList = (req, res) => __awaiter(this, void 0, void 0, function* () {
    const { user_id } = req.body;
    const { category } = req.params;
    yield Travels.find({ user_id, category }, (err, output) => {
        if (err)
            res.status(500).json({ error: err });
        if (!output)
            res.status(404).json({ error: 'Not Found' });
        else {
            res.status(200).json(output);
        }
    }).exec();
});
exports.showCategoryTravel = (req, res) => __awaiter(this, void 0, void 0, function* () {
    const { user_id } = req.body;
    const { travel_id } = req.params;
    yield Spots.find({ user_id, travel_id }, (err, output) => {
        if (err)
            res.status(500).json({ error: err });
        if (!output)
            res.status(404).json({ error: 'Not Found' });
        else {
            res.status(200).json(output);
        }
    }).sort({ day: 1, time: 1 }).exec();
});
//# sourceMappingURL=travel.ctrl.js.map