const Joi = require("joi");

const validateOrdersWithJoi = (order) => {
    const schema = Joi.object({
        yarnId: objectId().required(),
        quantity: Joi.number().min(0).required(),
    });
    const cartSchema = Joi.array().items(schema).required();
    return cartSchema.validate(order);
}

module.exports = validateOrdersWithJoi;