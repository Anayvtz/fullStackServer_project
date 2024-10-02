const mongoose = require("mongoose");
const NAME_VALIDATION = require("../helpers/nameValidation");
const PHONE_VALIDATION = require("../helpers/phoneValidation");
const EMAIL_VALIDATION = require("../helpers/emailValidation");
const IMAGE_VALIDATION = require("../helpers/imageValidation");
const ADDRESS_VALIDATION = require("../helpers/addressValidation");

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
    Cart: {
        createdAt: {
            type: Date,
            default: Date.now,
        },
        yarns: [{ yarnId: mongoose.Schema.Types.ObjectId, quantity: Number }]
    }
});

const UserSchema = mongoose.model("user", userSchema);

module.exports = UserSchema;