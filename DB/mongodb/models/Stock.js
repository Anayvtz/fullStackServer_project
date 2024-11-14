const mongoose = require("mongoose");
const STRING_VALIDATION = require("../helpers/stringValidation");
const { unique } = require("../helpers/emailValidation");



const stockSchema = new mongoose.Schema({
    yarnId: {
        type: mongoose.Schema.Types.ObjectId,
        unique: true
    },

    image: {
        imageurl: String,
        alt: STRING_VALIDATION
    },
    quantity: Number
});

const StockModel = mongoose.model("stock", stockSchema);

module.exports = StockModel;