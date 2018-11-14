var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var HouseSchema = new Schema({
    user: {
        // associate user by id 
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    street: {
       type: String,
       required: true
    },
    city: {
        type: String, 
        required: true
    },
    zipcode: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String
    },
    color: {
       type: String 
    },
    built: {
        type: String
    },
    rooms: {
        type: String, 
        required: true  
    },
    price: {
        type: String,
        required: true
    },
    from: {
        type: Date,
        required: true
    },
    to: {
        type: Date,
    },
    details: {
        type: String 
    },
    photo: {

    },
    date: {
        type: Date,
        default: Date.now
    }

});

module.exports = House = mongoose.model('House', HouseSchema)