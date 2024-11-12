const mongoose = require("mongoose");
const STRING_VALIDATION = require("./stringValidation");
const validator = require('validator');



const IMAGE_VALIDATION = {
    imageurl: STRING_VALIDATION,
    alt: STRING_VALIDATION
};

module.exports = IMAGE_VALIDATION;