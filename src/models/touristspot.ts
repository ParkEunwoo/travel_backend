import * as mongoose from 'mongoose';

const { Schema } = mongoose;

const TouristSpot = new Schema({
    name: String,
    category: String,
    roadAdress: String,
    numberAddress: String,
    latitude: Number,
    longitude: Number,
    area: String,
    pbfInfo: String,
    accInfo: String,
    eefInfo: String,
    rcfInfo: String,
    cfInfo: String,
    sfInfo: String,
    designedDate: String,
    number: String,
    parking: String,
    introduction: String,
    phone: String,
    agency: String,
    date: String,
    code: String,
    provider: String
});

module.exports = mongoose.model('touristspot', TouristSpot);