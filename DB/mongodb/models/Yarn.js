const mongoose = require("mongoose");
const STRING_VALIDATION = require("../helpers/stringValidation");
const IMAGE_VALIDATION = require("../helpers/imageValidation");

const yarnSchema = new mongoose.Schema({
    title: STRING_VALIDATION,
    subtitle: STRING_VALIDATION,
    description: { ...STRING_VALIDATION, maxLength: 1024 },
    yarnSize: {
        type: Number,
        required: true,
        min: 0,
        max: 7
    },
    quantityInStock: {
        type: Number,
        required: true
    },
    image: IMAGE_VALIDATION
});
const YarnModel = mongoose.model("yarn", yarnSchema);
module.exports = YarnModel;