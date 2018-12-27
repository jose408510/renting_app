const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const usersSchema = new Schema ({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Users', usersSchema)