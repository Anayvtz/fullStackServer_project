const mongoose = require("mongoose");
const STRING_VALIDATION = require("./stringValidation");



const IMAGE_VALIDATION = {
    url: {
        type: String,
        trim: true,
        lowercase: true,
        match: RegExp(
            /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/
        ),
    },
    alt: STRING_VALIDATION,
};

module.exports = IMAGE_VALIDATION;