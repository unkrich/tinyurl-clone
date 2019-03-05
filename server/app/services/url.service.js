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
async function create({ originalUrl, alias }, { authorization }) {
    // Validate URL
    if(!originalUrl) {
        throw "Url attribute originalUrl can not be empty";
    }

    // Validate alias if provided, or generate
    if (alias !== undefined) {
        if (await Url.findById(hash)) {
            throw "Alias provided is already in use.";
        }
    } else {
    	// TODO: Needs to generate unique hash, even given same URL
		hash = hashHelper.generateShortURL(req.body.originalUrl, 0, 4); // size 5
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
        originalUrl: req.body.originalUrl,
        expiresAt: req.body.expiresAt,
        userId: userId,
    });

    // TODO: atomic transactions
    await url.save();
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

        // TODO: Base on IP if no registered user.
        await Url.find({'userId': userId});
    } else {
        return [];
    }
};

async function findOne({ alias }) {
	// TODO: Check Expiration
    await Url.findById(alias)
}

async function _delete({ alias }) {
    await Url.findByIdAndRemove(alias);
};