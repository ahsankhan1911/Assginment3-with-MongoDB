var mongoose =require('mongoose');
var User = mongoose.model('Users');
// var passport = require('passport');
// var LocalStrategy = require('passport-local').Strategy;
// var BearerStrategy = require('passport-http-bearer').Strategy;
var jwt = require('jsonwebtoken');
// var boom = require('express-boom');
// var boom2 = require('boom');


 var myToken;


exports.createUser = function(req, res) {
    var new_User = new User(req.body);
    new_User.save(function (err, user) {
        if(!user){
             res.send(err);
        }

        else {

            res.send("Account created Successfully ! Thanks for signing up");
        }
    });


};

exports.logInUser = function (req, res) {
    User.findOne({email: req.body.email, password: req.body.password}, function (err, user) {

        if (!user) {
            res.send("Invalid email or password");
        }

        else {
            
            myToken = jwt.sign({
                 id: user._id,
                 email: req.body.email
                  }, "secret",
                  {expiresIn: 10 * 60000}
       );
        
            res.send("Welcome " + myToken);
        }

    });
};





    exports.userProfile = function (req, res) {
var decode = jwt.verify(myToken, 'secret', function(err, decoded){
User.findOne({email: decoded.email}, function(err2, user){

   if (!user) {
                res.send("Invalid Token");
            }
            else {
                res.send(user);
            }
});
});

    };




exports.showUser = function (req, res) {

var decode = jwt.verify(myToken, 'secret', function(err, decoded){
User.find({}, function(err2, user){

   if (!user) {
                res.send("Invalid Token");
            }
            else {
                res.send(user);
            }
});
});

};

    
    



    exports.deleteUser = function (req, res) {
        User.remove({}, function (err, user) {
            if (err)
                res.send("Cannot found this phone number");
            res.send({message: 'Task successfully deleted'});
        });
    };
