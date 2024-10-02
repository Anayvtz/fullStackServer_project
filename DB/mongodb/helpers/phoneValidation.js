
const mongoose = require("mongoose");



const PHONE_VALIDATION = new mongoose.Schema({

    type: String,
    required: true,
    match: RegExp(/0[0-9]{1,2}\-?\s?[0-9]{3}\s?[0-9]{4}/),
});
module.exports = PHONE_VALIDATION;