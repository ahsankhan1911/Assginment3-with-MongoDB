var mongoose =require('mongoose');
var User = mongoose.model('Users');


//var LocalStrategy = require('passport-local').Strategy;



// var boom = require('express-boom');
// var boom2 = require('boom');



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

///^(([a-zA-Z]{2,20})+[ ]+([a-zA-Z]{2,20}))+[ ]+([a-zA-Z]{2,20})$/


exports.logInUser = function (req, res) {


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

