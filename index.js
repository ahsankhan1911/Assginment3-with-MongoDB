'use strict';
var express = require('express');
var app = express();
var port = process.env.PORT || 5000;
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var User = require('./user/Model');
// var boom = require('express-boom');
var passport = require('passport');
var session = require('express-session');

mongoose.connect('mongodb://localhost/userdb', function(err){
    if(err){
        console.log(err);
    }
    else {
        console.log("MongoDB is now Connected")
    }
});

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies


app.use(passport.initialize());
app.use(passport.session());


app.use('/users', require('./user'));

app.listen(port, function () {
    console.log('Running server on ' + port);
});
