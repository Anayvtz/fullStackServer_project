const mongoose = require("mongoose");
const STRING_VALIDATION = require("../helpers/stringValidation");

const yarnSchema = new mongoose.Schema({
    title: STRING_VALIDATION,
    subtitle: STRING_VALIDATION,
    description: { ...STRING_VALIDATION, maxLength: 1024 },
    yarnSize: {
        type: Number,
        required: true,
        min: 0,
        max: 6
    },
    quantityInStock: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    }
});
const YarnSchema = mongoose.model("yarn", yarnSchema);
module.exports = YarnSchema;