var express = require('express');
var router = express.Router();
var user = require('./controller');

var passport = require('passport');

var mongoose = require('mongoose');
var User = mongoose.model('Users');

//router.use(passport.authenticate('bearer', {session: false}))

router.put('/create-user' , user.createUser);

router.post('/login-user', user.logInUser);


router.get('/show-user', passport.authenticate('bearer', { session: false }), user.showUser);

router.post('/delete-user', passport.authenticate('bearer', { session: false }), user.deleteUser);


router.get('/user-profile/:email', user.userProfile);

module.exports = router;

