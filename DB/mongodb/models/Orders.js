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
            imageurl: STRING_VALIDATION,
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