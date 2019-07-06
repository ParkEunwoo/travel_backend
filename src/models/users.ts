import * as mongoose from 'mongoose';

const { Schema } = mongoose;

const Profile = new Schema({
    image: {
        path: String,
        width: Number,
        height: Number
    }
});

const Friend = new Schema({
    friend_id: String
});

const Image = new Schema({
    path: String,
    width: Number,
    height: Number,
    time: String,
    latitude: Number,
    longitude: Number
});

const Spot = new Schema([{
    images: [Image],
    latitude: Number,
    longitude: Number,
    content: String
}]);

const Record = new Schema({
    place: String,
    start_date: String,
    end_date: String,
    category: String,
    views: Number,
    daily: [Spot]
});

const Users = new Schema({
	token : String,
    name : String,
    profile : Profile,
    friends : [Friend],
    records : [Record]
});

module.exports = mongoose.model('Users', Users);