var mongoose =require('mongoose');
var User = mongoose.model('Users');
// var passport = require('passport');
// var LocalStrategy = require('passport-local').Strategy;
// var BearerStrategy = require('passport-http-bearer').Strategy;
var jwt = require('jsonwebtoken');
// var boom = require('express-boom');
// var boom2 = require('boom');


 var   myToken = jwt.sign({
         id: user._id,
         email: req.body.email
     }, "secret",
     {expiresIn: 60000}
 );

// passport.use(new LocalStrategy({
//         usernameField: 'email'
//     },
//     function(username, password, done) {
//         User.findOne({ email: username , password: password}, function (err, user) {
//             if (err) {
//                 return done(err);
//             }
//             if (!user) {
//                 return done(null, false);
//             }
//             else {
//
//                 return done(null, user);
//             }
//         });
//     }
//
// ));

// passport.use(new BearerStrategy({},
// function(token, done){
//    User.findOne({token: token}, function (err, user) {
//        if (err) {
//            return done(err);
//        }
//        if(!user){
//            return done(null, false);
//        }
//        else {
//
//            return done(null, user, {scope: 'all'});
//        }
//
//    })
// }
// ));


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


            // jwt.decode(myToken, {complete: true, json: true});
            // console.log(myToken);
            res.send("Welcome " + myToken);






        }
    });
};





    exports.userProfile = function (req, res) {

        User.findOne({email: req.params.email}, function (err, user) {

            if (!user) {
                res.send("NO user found");
            }
            else {
                res.send(user);
            }
        });
    };




exports.showUser = function (req, res) {

  res.send(myToken);
};

    // var decoded = jwt.decode(myToken, {complete: true});
    // console.log(decoded.email);
    // };



    exports.deleteUser = function (req, res) {
        User.remove({}, function (err, user) {
            if (err)
                res.send("Cannot found this phone number");
            res.send({message: 'Task successfully deleted'});
        });
    };
