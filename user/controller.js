var mongoose =require('mongoose');
var User = mongoose.model('Users');




exports.createUser = function(req, res) {

    var new_User = new User(req.body);
    new_User.save(function (err, user) {
        if(err) {
            res.send("An account already exists with this Email");
        }
        else {
            res.send("Account created Successfully ! Thanks for signing up");
        }

    });

};



exports.logInUser = function (req, res) {

    User.findOne({email: req.body.email, password: req.body.password}, function (err, user) {

        if(!user) {
            res.send("No user found");    }
        else {
            res.send("Welcome User " + user.firstname);
        }
    });

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