const urlService = require('../services/url.service');

exports.create = (req, res, next) => {
    urlService.create(req.body, req.headers)
        .then(url => url ? res.json(url) : res.status(500).json({ message: 'Some error occurred while creating the url.' }))
        .catch(err => next(err));
}

exports.findAll = (req, res, next) => {
    urlService.findAll(req.headers)
        .then(urls => res.json(urls))
        .catch(err => next(err));
}

exports.findOne = (req, res, next) => {
    urlService.findOne(req.params.hash)
        .then(url => url ? res.json(url) : res.sendStatus(404))
        .catch(err => next(err));
}

exports._delete = (req, res, next) => {
    urlService._delete(req.headers.authorization, req.params.hash)
        .then(url => url ? res.json(url) : res.sendStatus(404))
        .catch(err => next(err));
}