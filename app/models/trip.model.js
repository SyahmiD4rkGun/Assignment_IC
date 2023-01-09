const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let TripSchema = new Schema({
    name: {type: String, required: true, max: 20},
    trip_place: {type: String, required: true, max:30},
    price: {type: Number, required: true},
});

//Export the model
module.exports = mongoose.model('Trip', TripSchema);
