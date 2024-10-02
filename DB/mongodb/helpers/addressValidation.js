const mongoose = require("mongoose");
const STRING_VALIDATION = require("./stringValidation");


const ADDRESS_VALIDATION = new mongoose.Schema({
    state: {
        type: String,
        maxLength: 256,
        trim: true,
    },
    country: STRING_VALIDATION,
    city: STRING_VALIDATION,
    street: STRING_VALIDATION,
    houseNumber: {
        type: Number,
        required: true,
        min: 1,
    },
    zip: {
        type: Number,
        default: 0,
    },
});

module.exports = ADDRESS_VALIDATION;