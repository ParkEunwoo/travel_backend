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
    latitude: Float64Array,
    longitude: Float64Array
});

const Spot = new Schema([{
    images: [Image],
    latitude: Float64Array,
    longitude: Float64Array,
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
    record : Record
});

module.exports = mongoose.model('Users', Users);