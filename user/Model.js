'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var validate = require('mongoose-validator');

var EmailValidator = [
    validate({
            validator: 'matches',
            arguments: /^[\w.]+[@]+[a-zA-Z]+.com$/,
            unique: true,
            message: 'Same or Invalid email address'
    })
];

var PhoneValidator = [
    validate({
        validator: 'matches',
        arguments: /^923[1-9]{9}$/,
        message: 'its not valid phone number'
    })
];

var UserSchema = new Schema({

        firstname: String,
        lastname: String,
        email: {type: String, lowercase: true, validate: EmailValidator },
        phone: {type: Number, required: true , validate: PhoneValidator},
        password: {type: String, required: true},
        token: String
    }
);

module.exports = mongoose.model('Users', UserSchema);