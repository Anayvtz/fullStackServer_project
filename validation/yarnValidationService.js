const validateYarnWithJoi = require("./joi/yarnJoiValidation");

const validateYarn = (yarn) => {

    const { error } = validateYarnWithJoi(yarn);
    if (error) return error.details[0].message;
    return "";

};

module.exports = validateYarn;