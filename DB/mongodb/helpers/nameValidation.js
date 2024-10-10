const mongoose = require("mongoose");
const STRING_VALIDATION = require("./stringValidation");


const NAME_VALIDATION = {
    first: STRING_VALIDATION,
    middle: {
        ...STRING_VALIDATION,
        required: false,
        minLength: 0,
    },
    last: STRING_VALIDATION,
};

module.exports = NAME_VALIDATION;