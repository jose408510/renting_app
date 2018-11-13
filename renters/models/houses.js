var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var houseSchema = new Schema({
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
    phone: {
        type: String
    },
    color: {
       type: String 
    },
    built: {
        
    },
    rooms: {
        type: String,   
    },
    price: {
        
    },
    from: {
        type: Date,
        required: true
    },
    to: {
        type: Date,
    },
    comments: {
        
    },
    photo: {

    }
});

var House = mongoose.model("House", houseSchema);

// Export the House model
module.exports = House;

