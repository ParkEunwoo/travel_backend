import * as express from 'express';
import * as multer from 'multer';
const travelCtrl = require('./travel.ctrl');

const travel = express.Router();

travel.use(express.json());


const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'lib/travel/' + req.params.id);
    },
    filename: (req, file, callback) => {
        callback(null, new Date().valueOf()+'.'+file.mimetype.split('/')[1]);
    }
});

const upload = multer({ storage }).array('files', 30);

travel.get('/', travelCtrl.myList);
travel.post('/', travelCtrl.addTravel);
travel.post('/:_id/daily/:day', upload, travelCtrl.writeDaily);
travel.get('/:_id', travelCtrl.showTravel);
travel.put('/:_id/daily/:day', upload, travelCtrl.modifyDaily);
travel.delete('/:_id', travelCtrl.deleteTravel);
travel.get('/:category', travelCtrl.categoryList);
travel.get('/:category/:_id', travelCtrl.showCategoryTravel);

module.exports = travel;
