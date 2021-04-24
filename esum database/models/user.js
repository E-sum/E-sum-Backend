const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const email = require('../models/email');

const userSchema = new Schema({
    userEmail: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, {collection: 'users', timestamps: true});
const user = mongoose.model('user', userSchema);
module.exports = user;
