const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const email = require('../models/email');

const adminSchema = new Schema({
    adminEmail: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, { collection: 'admin', timestamps: true });

const admin = mongoose.model('admin', adminSchema);
module.exports = admin;