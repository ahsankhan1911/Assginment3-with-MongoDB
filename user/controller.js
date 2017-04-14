var mongoose =require('mongoose');
var User = mongoose.model('Users');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var BearerStrategy = require('passport-http-bearer').Strategy;
var jwt = require('jsonwebtoken');
// var boom = require('express-boom');
// var boom2 = require('boom');




passport.use(new LocalStrategy({
        usernameField: 'email'
    },
    function(username, password, done) {
        User.findOne({ email: username , password: password}, function (err, user) {
            if (err) {
                return done(err);
            }
            if (!user) {
                return done(null, false);
            }

            return done(null, user);
        });
    }

));

passport.use(new BearerStrategy({},
function(token, done){
   User.findOne({}, function (err, user) {
       if (err) {
           return done(err);
       }
       if(!user){
           return done(null, false);
       }
       else {

           return done(null, user);
       }

   })
}
));

exports.createUser = function(req, res) {
    var new_User = new User(req.body);
    new_User.save(function (err, user) {
        if(err){
             res.send(err.message);
        }

        else {
            res.send("Account created Successfully ! Thanks for signing up");
        }
    });


};

exports.logInUser = function (req, res , next) {

    passport.authenticate('local', function (err, user) {

        if(!user){
            return res.send("Incorrect email or password")
        }
        else {
            var myToken = jwt.sign({},'secret');
            res.send("Welcome User " + user.firstname + " token = " + myToken);
        }

    })(req, res, next);

 };


exports.userProfile = function (req, res){

    User.findOne({email: req.params.email}, function(err, user){

        if(!user) {
            res.send("NO user found");
        }
        else {
            res.send(user);
        }
    });


};


exports.showUser = function(req, res) {
    User.find({}, function(err, user) {
        if (err)
            res.send("NO user founds");
        res.send(user);
    });
};


exports.deleteUser = function(req, res) {
    User.remove({}, function (err, user) {
        if (err)
            res.send("Cannot found this phone number");
        res.send({message: 'Task successfully deleted'});
    });
};

