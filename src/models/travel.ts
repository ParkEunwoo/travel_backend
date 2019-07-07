import * as mongoose from 'mongoose';

const { Schema } = mongoose;

const Image = new Schema({
    path: String,
    name: String,
    ext: String
});

const Spot = new Schema({
    images: [Image],
    latitude: Number,
    longitude: Number,
    time: String,
    content: String
});

const Spots = new Schema({
    day: Number,
    spots: [Spot]
});

const Travels = new Schema({
	user_id : String,
    name : String,
    place: String,
    start_date: String,
    end_date: String,
    category: String,
    views: Number,
    daily: [Spots]
});

module.exports = mongoose.model('Travels', Travels);