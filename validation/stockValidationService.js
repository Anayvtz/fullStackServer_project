const validateStockWithJoi = require("./joi/stockJoiValidation");

const validateStock = (stock) => {

    const { error } = validateStockWithJoi(stock);
    if (error) return error.details[0].message;
    return "";

};

module.exports = validateStock;