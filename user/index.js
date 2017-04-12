var express = require('express');
var router = express.Router();
var user = require('./controller');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var mongoose = require('mongoose');
var User = mongoose.model('Users');

router.post('/create-user' , user.createUser);




passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
    },
    function(username, password, done) {
        User.findOne({ email: username , password: password}, function (err, user) {
            if (err) { return done(err); }
            if (!user) {
                return done(null, false, { message: 'Incorrect email.' });
            }
            if (!user.password) {
                return done(null, false, { message: 'Incorrect password.' });
            }
            return done(null, user);
        });
    }
));
passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});

router.post('/login-user', passport.authenticate('local'),  function (req, res) {
     console.log(req.body);

    res.send("Welcome User");
});


router.get('/show-user', user.showUser);

router.get('/delete-user', user.deleteUser);


router.get('/user-profile/:email', user.userProfile);

module.exports = router;

