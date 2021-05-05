const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const emailSchema = new Schema({
  subject: {
    type: String,
    required: false,
  },
  receipient: {
    type: [String],
    required: true,
  },
  date:{
    type:String,
    required:true
  },
  body: {
    type: String,
    required: true
  },
  // This allows email threads catered to a certain user because they asked it MUST have their ID associated with it.
  userId: {
    type: String,
    required: true
  }
}, { timestamps: true });

const email = mongoose.model('email', emailSchema);
module.exports = email;