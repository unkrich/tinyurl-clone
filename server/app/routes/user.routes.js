module.exports = (app) => {
    const users = require('../controllers/user.controller.js');

	app.post('/users/authenticate', users.authenticate);
	app.post('/users/register', users.register);
}