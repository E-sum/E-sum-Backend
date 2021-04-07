const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const emailSchema = new Schema({
  subject: {
    type: String,
    required: false,
  },
  receipient: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true
  },
}, { timestamps: true });

const email = mongoose.model('email', emailSchema);
module.exports = email;