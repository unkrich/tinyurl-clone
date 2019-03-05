const crypto = require('crypto');

// TODO: Needs to account for duplicate URL is hashing to same hash/id, not unique
exports.generateShortURL = (longURL, startIndex, endIndex) => {
	const hash = crypto.createHash('md5').update(longURL).digest('hex'); // should be base32
	return hash.substring(startIndex, endIndex + 1);
}