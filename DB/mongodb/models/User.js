const mongoose = require("mongoose");
const NAME_VALIDATION = require("../helpers/nameValidation");
const PHONE_VALIDATION = require("../helpers/phoneValidation");
const EMAIL_VALIDATION = require("../helpers/emailValidation");
const IMAGE_VALIDATION = require("../helpers/imageValidation");
const ADDRESS_VALIDATION = require("../helpers/addressValidation");
const STRING_VALIDATION = require("../helpers/stringValidation");

const userSchema = new mongoose.Schema({
    name: NAME_VALIDATION,
    phone: PHONE_VALIDATION,
    email: EMAIL_VALIDATION,
    password: {
        type: String,
        required: true,
        trim: true,
    },
    image: IMAGE_VALIDATION,
    address: ADDRESS_VALIDATION,
    isAdmin: { type: Boolean, default: false },
    isBusiness: { type: Boolean, default: false },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    Cart: [{
        yarnId: mongoose.Schema.Types.ObjectId,
        image: {
            url: {
                type: String,
                trim: true,
                lowercase: true,
                match: RegExp(
                    /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/
                )
            },
            alt: STRING_VALIDATION
        },
        quantity: Number,
        price: Number
    }]

});

const UserModel = mongoose.model("user", userSchema);

module.exports = UserModel;