const mongoose = require("mongoose");




const STRING_VALIDATION = {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 256,
    trim: true,
    lowercase: true
};
module.exports = STRING_VALIDATION;