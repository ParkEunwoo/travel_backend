"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const multer = require("multer");
const travelCtrl = require('./travel.ctrl');
const travel = express.Router();
travel.use(express.json());
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'public/images/travel/' + req.params.travel_id);
    },
    filename: (req, file, callback) => {
        callback(null, new Date().valueOf() + '.' + file.mimetype.split('/')[1]);
    }
});
const upload = multer({ storage }).array('files', 30);
const store = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'public/images/travel/');
    },
    filename: (req, file, callback) => {
        callback(null, new Date().valueOf() + '.' + file.mimetype.split('/')[1]);
    }
});
const up = multer({ storage: store }).single('file');
travel.get('/list/:user_id', travelCtrl.myList);
travel.post('/', up, travelCtrl.addTravel);
travel.get('/:travel_id', travelCtrl.showTravel);
travel.post('/spot/:travel_id', upload, travelCtrl.writeSpot);
travel.put('/spot/:travel_id', upload, travelCtrl.modifySpot);
travel.put('/:_id/like', travelCtrl.likeTravel);
travel.delete('/:_id', travelCtrl.deleteTravel);
travel.get('/category/:category', travelCtrl.categoryList);
travel.get('/category/:category/:travel_id', travelCtrl.showCategoryTravel);
travel.get('/tourist/spot/:latitude/:longitude/:latitudeDelta/:longitudeDelta', travelCtrl.touristSpot);
module.exports = travel;
//# sourceMappingURL=index.js.map