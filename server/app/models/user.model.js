const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    hash: { type: String, required: true },
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String, required: true },
    lastLogin: { type: Date, default: Date.now },
    createdAt: { type: Date, default: Date.now }
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('User', schema);