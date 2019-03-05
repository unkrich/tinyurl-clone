module.exports = (app) => {
    const urls = require('../controllers/url.controller.js');

    app.post('/urls/new', urls.create);
    app.get('/urls', urls.findAll);
    app.get('/urls/:hash', urls.findOne);
    app.delete('/urls/delete/:hash', urls._delete);
}