import * as mongoose from 'mongoose';

const { Schema } = mongoose;

const Image = new Schema({
    path: String,
    name: String,
    ext: String
});


const Users = new Schema({
	token : String,
    name : String,
    profile : Image,
    introduct : String,
    friends : [String]
});

module.exports = mongoose.model('Users', Users);