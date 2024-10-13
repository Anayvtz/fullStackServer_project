const mongoose = require("mongoose");
const STRING_VALIDATION = require("../helpers/stringValidation");



const stockSchema = new mongoose.Schema({
    yarnId: mongoose.Schema.Types.ObjectId,
    image: {
        url: {
            type: String,
            trim: true,
            lowercase: true,
            match: RegExp(
                /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/
            ),
            unique: true,
        },
        alt: STRING_VALIDATION
    },
    quantity: Number
});

const StockModel = mongoose.model("stock", stockSchema);

module.exports = StockModel;