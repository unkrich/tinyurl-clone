const urlService = require('../services/url.service');

exports.create = (req, res, next) => {
    urlService.create(req.body, req.headers)
        .then(url => url ? res.json(url) : res.status(500).json({ message: 'Some error occurred while creating the url.' }))
        .catch(err => next(err));
}

exports.findAll = (req, res, next) => {
    urlService.findAll(req.headers)
        .then(() => res.json({}))
        .catch(err => next(err));
}

exports.findOne = (req, res, next) => {
    urlService.findOne(req.body)
        .then(url => url ? res.json(url) : res.sendStatus(404))
        .catch(err => next(err));
}

exports._delete = (req, res, next) => {
    urlService.delete(req.body)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}