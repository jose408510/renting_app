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
    info: 
      {
        name: {
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
        workphone: {
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
      description: [
        {
          street: {
            type: String,  
            required: true
          },
          zip: {
              type: String,
              required: true
          },
          state: {
            type: String,
            required: true
          },
          city: {
            type: String,
            required: true 
          },
          image: {
            type: [String],
          },
          addinfo: {
            type : String, 
            require: true
          },
          yearbuilt: {
              type: String,
              required: true
          },
          rooms: {
              type: String,
              required: true
          },
          bathroom: {
              type: String,
              required: true
          },
          parking: {
              type: String,
              required: true
          },
          price: {
              type: String,
              required: true
          },
          created: {
              type: Date,
              default: Date.now
            }
        }
      ],
      date: {
        type: Date,
        default: Date.now
      }
})

module.exports = mongoose.model('Profiles', profilesSchema)