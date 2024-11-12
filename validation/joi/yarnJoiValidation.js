const Joi = require("joi");

const validateYarnWithJoi = (yarn) => {
    const urlRegex =
        /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/;

    const schema = Joi.object({
        title: Joi.string().min(2).max(256).required(),
        subtitle: Joi.string().min(2).max(256).required(),
        description: Joi.string().min(2).max(1024).required(),
        yarnSize: Joi.number().min(0).max(7).required(),
        quantityInStock: Joi.number().min(0).required(),
        image: Joi.object()
            .keys({
                imageurl: Joi.string().min(2).required(""),
                alt: Joi.string().min(2).max(256).allow(""),
            })
            .required(),
        price: Joi.number().min(1).required()
    });

    return schema.validate(yarn);
};

module.exports = validateYarnWithJoi;