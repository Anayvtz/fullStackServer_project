const mongoose = require("mongoose");
const ADDRESS_VALIDATION = require("../helpers/addressValidation");
const NAME_VALIDATION = require("../helpers/nameValidation");
const EMAIL_VALIDATION = require("../helpers/emailValidation");


const ordersSchema = new mongoose.Schema({
    createdAt: {
        type: Date,
        default: Date.now,
    },
    yarns: [{ yarnId: mongoose.Schema.Types.ObjectId, quantity: Number }],
    customerId: mongoose.Schema.Types.ObjectId,
    customerName: NAME_VALIDATION,
    customerAddress: ADDRESS_VALIDATION,
    customerEmail: EMAIL_VALIDATION,
    status: ['inprocess', 'completed']
});

const OrdersModel = mongoose.model("order", ordersSchema);

module.exports = OrdersModel;