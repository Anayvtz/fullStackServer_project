const Joi = require("joi");

const validateOrdersWithJoi = (order) => {
    const urlRegex =
        /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/;
    const schema = Joi.object({
        yarnId: Joi.string().hex().required(),
        image: Joi.object()
            .keys({
                imageurl: Joi.string()
                    .min(2)
                    .required(""),
                alt: Joi.string().min(2).max(256).allow(""),
            })
            .required(),
        quantity: Joi.number().min(0).required(),
        _id: Joi.string().hex().required(),
        price: Joi.number().min(0).required()
    });
    const cartSchema = Joi.array().items(schema).required();
    return cartSchema.validate(order);
}

module.exports = validateOrdersWithJoi;