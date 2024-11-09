const mongoose = require("mongoose");
const ADDRESS_VALIDATION = require("../helpers/addressValidation");
const NAME_VALIDATION = require("../helpers/nameValidation");
const EMAIL_VALIDATION = require("../helpers/emailValidation");
const STRING_VALIDATION = require("../helpers/stringValidation");


const ordersSchema = new mongoose.Schema({
    createdAt: {
        type: Date,
        default: Date.now,
    },
    yarns: [{
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
        quantity: Number
    }],
    customerId: mongoose.Schema.Types.ObjectId,
    customerName: NAME_VALIDATION,
    customerAddress: ADDRESS_VALIDATION,
    customerEmail: EMAIL_VALIDATION,
    status: ['inprocess', 'completed']
});

const OrdersModel = mongoose.model("order", ordersSchema);

module.exports = OrdersModel;