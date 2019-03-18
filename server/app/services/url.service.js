const hashHelper = require('../helpers/hash.helper');
const config = require('../../config/hash.config.json');
const jwt = require('jsonwebtoken');

const Url = require('../models/url.model');
const User = require('../models/user.model');

module.exports = {
    create,
    findAll,
    findOne,
    _delete
};

// Create and Save a new url
async function create({ originalUrl, alias, expiresAt }, { authorization }) {
    // Validate URL
    if(!originalUrl) {
        throw "Url attribute originalUrl can not be empty";
    }

    // Validate alias if provided, or generate
    var hash;
    if (alias !== undefined) {
        if (await Url.findById(hash)) {
            throw "Alias provided is already in use.";
        } else {
            hash = alias;
        }
    } else {
    	// TODO: Needs to generate unique hash, even given same URL
		hash = hashHelper.generateShortURL(originalUrl, 0, 4); // size 5
    }

    var userId;
    if (authorization) {
        var decoded;
        try {
            decoded = jwt.verify(authorization.split(' ')[1], config.secret);
        } catch (e) {
            throw "There was an error associating the user with this url. Sign out and back in. Then try again."
        }
        userId = decoded.sub;
    }

    const url = new Url({
    	_id: hash,
        title: "No Title Found.",
        originalUrl: originalUrl,
        expiresAt: expiresAt,
        userId: userId,
    });

    // TODO: atomic transactions
    return await url.save();
};

async function findAll({ authorization }) {
    var userId;
    if (authorization) {
        var decoded;
        try {
            decoded = jwt.verify(authorization.split(' ')[1], config.secret);
        } catch (e) {
            throw "There was an error associating the user with this url. Sign out and back in. Then try again."
        }
        userId = decoded.sub;
    }
    // TODO: Base on IP if no registered user.
    return await Url.find({'userId': userId});
};

async function findOne(alias) {
	// TODO: Check Expiration
    // TODO: atomic transactions
    // mongoose's findOneAndUpdate() & findAndModify seem to have a bug.

    return await Url.findOne({_id: alias}, function(err, url) {
        url.numVisits = url.numVisits + 1;
        url.markModified('numVisits');
        url.save(function(err, url) {
            if (err) {
                throw "Error: " + err;
            }
        })
    });
}

async function _delete({ alias }) {
    return await Url.findByIdAndRemove(alias);
};