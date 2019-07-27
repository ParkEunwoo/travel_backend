import * as mongoose from 'mongoose';

const { Schema } = mongoose;

const Image = new Schema({
    path: String,
    name: String,
    ext: String,
    uri: String
});

const Spots = new Schema({
    user_id: String,
    travel_id: String,
    title: String,
    day: Number,
    images: [Image],
    latitude: Number,
    longitude: Number,
    time: String,
    content: String
});


module.exports = mongoose.model('Spots', Spots);