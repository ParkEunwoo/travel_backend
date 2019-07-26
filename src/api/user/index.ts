import * as express from 'express';
import * as multer from 'multer';
import * as fs from 'fs';

const userCtrl = require('./user.ctrl');

const user = express.Router();

user.use(express.json());


const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'public/images/profile/');
    },
    filename: (req, file, callback) => {
        callback(null, new Date().valueOf()+'.'+file.mimetype.split('/')[1]);
    }
});

const upload = multer({ storage }).single('file');

user.get('/:user_id/friends', userCtrl.friendList);
user.post('/friends', userCtrl.addFriend);
user.delete('/friends/:friend', userCtrl.deleteFriend);
user.get('/:user_id/friends/travel', userCtrl.friendsTravelList);
user.get('/friends/:friend/travel', userCtrl.friendTravelList);
user.put('/profile', upload, userCtrl.modifyProfile);
user.post('/auth/signup', upload, userCtrl.signup);
user.get('/auth/login', upload, userCtrl.login);


module.exports = user;
