const userService = require('../services/user.service');

exports.authenticate = (req, res, next) => {
    userService.authenticate(req.body)
        .then(user => user ? res.json(user) : res.status(400).json({ message: 'Email or password is incorrect.' }))
        .catch(err => next(err));
}

exports.register = (req, res, next) => {
    userService.create(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}