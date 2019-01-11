const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const profilesSchema = new Schema ({
    user: {
      type: Schema.Types.ObjectId,
      ref: 'Users'
    },
    handle :{
      type: String,
      required: true,
      max: 40
    },
    info: [
      {
        name: {
          type: String,
          required: true
        },
        avatar: {
          type: String,
          required: true
        },
        bio: {
          type: String,
          required: true
        },
        phone: {
          type: String,
        },
        workPhone: {
          type: String
        },
        website : {
          type: String
        },
        city: {
          type: String,
          required: true
        },
        state: {
          type: String,
          requred: true
        }
      }
    ],
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