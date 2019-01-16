const mongoose = require('mongoose')
const Schema = mongoose.Schema

const housesSchema = new Schema ({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
      },
      // street: {
      //   type: String,  
      //   required: true
      // },
      // zip: {
      //     type: String
      // },
      // state: {
      //   type: String,
      //   required: true
      // },
      // city: {
      //   type: String,
      //   required: true 
      // },
      // image: {
      //   id: String,
      //   url: String
      // },
      // addinfo: {
      //   type : String 
      // },
      // description: [
      //   {
      //       yearbuilt: {
      //           type: String,
      //           required: true
      //       },
      //       rooms: {
      //           type: String,
      //           required: true
      //       },
      //       bathroom: {
      //           type: String,
      //           required: true
      //       },
      //       parking: {
      //           type: String,
      //           required: true
      //       },
      //       price: {
      //           type: String,
      //           required: true
      //       },
      //       created: {
      //           type: Date,
      //           default: Date.now
      //         }
      //   }
      // ],
      likes: [
        {
          user: {
            type: Schema.Types.ObjectId,
            ref: 'users'
          }
        }
      ],
      date: {
        type: Date,
        default: Date.now
      }
    });   

module.exports = mongoose.model('Houses' , housesSchema);