import * as express from 'express';
import * as multer from 'multer';
const travelCtrl = require('./travel.ctrl');

const travel = express.Router();

travel.use(express.json());


const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'lib/travel/'+req.body.token)
    },
    filename: (req, file, callback) => {
        callback(null, new Date().valueOf()+'.'+file.mimetype.split('/')[1]);
    }
});

const upload = multer({ storage }).array('images', 30);

travel.get('/', travelCtrl.myList);
travel.post('/', travelCtrl.addTravel);
travel.post('/:id/daily/:day', travelCtrl.writeDaily);
travel.post('/image', upload, travelCtrl.imageTest);

module.exports = travel;
