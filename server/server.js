var express = require('express');
var cors = require('cors')
var bodyparser = require('body-parser');
var path = require('path');
var initService = require('./services/init.service')();

var port = process.env.PORT || 4000;

var app = express();

var corsOptions = {
    origin: 'http://localhost:3000'
};

app.use(cors(corsOptions));
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

app.use(express.static(path.join(__dirname, 'client')));

require('./routes/index')(app);
require('./routes/search')(app);

initService.init();

app.listen(port, function () {
    console.log('Search-app runs at port: ' + port);
});