const Joi = require("joi");

const validateStockWithJoi = (stock) => {
    const urlRegex =
        /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/;
    const schema = Joi.object({
        yarnId: Joi.string().hex().required(),
        image: Joi.object()
            .keys({
                url: Joi.string()
                    .ruleset.regex(urlRegex)
                    .rule({ message: 'yarn.image "url" must be a valid url' })
                    .required(""),
                alt: Joi.string().min(2).max(256).allow(""),
            })
            .required(),
        quantity: Joi.number().min(0).required(),
    });
    return schema.validate(stock);
}

module.exports = validateStockWithJoi;