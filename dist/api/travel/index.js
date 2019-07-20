"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const multer = require("multer");
const travelCtrl = require('./travel.ctrl');
const travel = express.Router();
travel.use(express.json());
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'public/images/travel/' + req.params._id);
    },
    filename: (req, file, callback) => {
        callback(null, new Date().valueOf() + '.' + file.mimetype.split('/')[1]);
    }
});
const upload = multer({ storage }).array('files', 30);
travel.get('/', travelCtrl.myList);
travel.post('/', travelCtrl.addTravel);
travel.get('/:travel_id', travelCtrl.showTravel);
travel.post('/:travel_id/daily/:day', upload, travelCtrl.writeSpot);
travel.put('/:travel_id/daily/:day', upload, travelCtrl.modifySpot);
travel.put('/:_id/like', travelCtrl.likeTravel);
travel.delete('/:_id', travelCtrl.deleteTravel);
travel.get('/category/:category', travelCtrl.categoryList);
travel.get('/category/:category/:travel_id', travelCtrl.showCategoryTravel);
module.exports = travel;
//# sourceMappingURL=index.js.map