var express = require('express');
var router = express.Router();
var user = require('./controller');
var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('Users');
var expressJWT = require('express-jwt');

//router.use(passport.authenticate('bearer', {session: false}))

router.use(expressJWT({secret: 'secret'}).unless({path: ['/users/login-user', '/users/create-user']}));

router.put('/create-user' , user.createUser);

router.post('/login-user', user.logInUser);


router.get('/show-user',user.showUser);

router.post('/delete-user', user.deleteUser);


router.get('/user-profile/:email', user.userProfile);

module.exports = router;

