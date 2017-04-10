'use strict';
var express = require('express');
var app = express();
var port = process.env.PORT || 5000;
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var User = require('./user/Model');


mongoose.connect('mongodb://localhost/userdb');

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.use('/users', require('./user'));



app.listen(port, function () {
    console.log('Running server on ' + port);
});
