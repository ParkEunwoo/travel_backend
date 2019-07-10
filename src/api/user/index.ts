import * as express from 'express';
import * as multer from 'multer';
const userCtrl = require('./user.ctrl');

const user = express.Router();

user.use(express.json());


const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'public/images/profile/' + req.body._id);
    },
    filename: (req, file, callback) => {
        callback(null, new Date().valueOf()+'.'+file.mimetype.split('/')[1]);
    }
});

const upload = multer({ storage }).array('files', 30);

user.get('/friends', userCtrl.friendList);
user.post('/friends', userCtrl.addFriend);
user.delete('/friends/:friend', userCtrl.deleteFriend);
user.get('/friends/travel', userCtrl.friendsTravelList);
user.get('/friends/:friend/travel', userCtrl.friendTravelList);
user.get('/friends/:friend/travel/:_id', userCtrl.friendTravel);
user.put('/profile', upload, userCtrl.modifyProfile);


module.exports = user;
