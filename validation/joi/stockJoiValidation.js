const Joi = require("joi");

const validateStockWithJoi = (stock) => {
    const schema = Joi.object({
        yarnId: objectId().required(),
        quantity: Joi.number().min(0).required(),
    });
    return schema.validate(stock);
}

module.exports = validateStockWithJoi;