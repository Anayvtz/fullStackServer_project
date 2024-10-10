
const mongoose = require("mongoose");



const EMAIL_VALIDATION = {
    type: String,
    required: true,
    match: RegExp(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/),
    lowercase: true,
    trim: true,
    unique: true,
};

module.exports = EMAIL_VALIDATION;