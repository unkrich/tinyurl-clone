const mongoose = require('mongoose');
const dateHelper = require('../helpers/date.helper.js');

const UrlSchema = mongoose.Schema({
    _id: String, // the hash/alias
    originalUrl: { type: String, required: true },
    title: String,
    numVisits: { type: Number, default: 0 },
    expiresAt: { type: Date, default: dateHelper.getDateInTenYears() },
    userId: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Url', UrlSchema);