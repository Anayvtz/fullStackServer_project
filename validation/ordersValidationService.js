const validateOrdersWithJoi = require("./joi/ordersJoiValidation");

const validateOrders = (order) => {

    const { error } = validateOrdersWithJoi(order);
    if (error) return error.details[0].message;
    return "";

};

module.exports = validateOrders;