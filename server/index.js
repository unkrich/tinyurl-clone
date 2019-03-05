const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('./app/helpers/jwt.helper');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(cors());
app.use(jwt());

// Configuring the database
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});


// Require routes
app.get('/', (req, res) => {
    res.json({"message": "Welcome to unkri.ch!"});
});
require('./app/routes/url.routes.js')(app);
require('./app/routes/user.routes.js')(app);

app.use(errorHandler);

app.listen(4000, () => {
    console.log("Server is listening on port 4000");
});
