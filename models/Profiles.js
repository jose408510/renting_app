const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const profilesSchema = new Schema ({
    // refrence the user
    name: {
        type: String, 
        required: true
    },
    


    social: {
        youtube: {
          type: String
        },
        twitter: {
          type: String
        },
        facebook: {
          type: String
        },
        linkedin: {
          type: String
        },
        instagram: {
          type: String
        }
      },
      date: {
        type: Date,
        default: Date.now
      }
})

module.exports = mongoose.model('Profiles', profilesSchema)