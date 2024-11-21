const OrdersModel = require("../DB/mongodb/models/Orders");
const { createError } = require("../utils/handleErrors");
const { getStock, findStockByYarnId, updateStock } = require("./stockDataAccessService");

const createOrder = async (newOrder) => {
    try {

        let order = new OrdersModel(newOrder);
        order.status = "inprocess";
        order = await order.save();
        order.yarns.map(async (yarn) => {
            let stock = await findStockByYarnId(yarn.yarnId);
            stock.quantity -= yarn.quantity;
            await updateStock(stock?._id, stock);
        })
        return order;
    } catch (error) {
        return createError("createOrder", "Mongoose", error);
    }
}

const getOrders = async () => {
    try {
        let orders = await OrdersModel.find();
        return orders;
    } catch (error) {
        return createError("getOrders", "Mongoose", error);
    }
};

const getOrder = async (orderId) => {
    try {
        let order = await OrdersModel.findById(orderId);
        return order;
    } catch (error) {
        return createError("getOrder", "Mongoose", error);
    }
};
const getOrdersByCustomer = async (userId) => {
    try {
        let orders = await OrdersModel.find({ customerId: userId });
        return orders;
    } catch (error) {
        return createError("getOrdersByCustomer", "Mongoose", error);
    }
};
const updateOrder = async (orderId, newOrder) => {
    try {
        let order = await OrdersModel.findByIdAndUpdate(orderId, newOrder, { new: true });
        return order;
    } catch (error) {
        return createError("updateOrder", "Mongoose", error);
    }
};
const updateOrderStatus = async (orderId) => {
    try {
        let order = await OrdersModel.findById(orderId);
        order.status = (order.status == "inprocess" ? "completed" : "inprocess");
        order = await order.save();
        return order;
    } catch (error) {
        return createError("updateOrderStatus", "Mongoose", error);
    }
};

const deleteOrder = async (orderId) => {
    try {
        let order = await OrdersModel.findByIdAndDelete(orderId);
        return order;
    } catch (error) {
        return createError("deleteOrder", "Mongoose", error);
    }
};
const getMyOrders = async (userId) => {
    try {
        let orders = await OrdersModel.find({ customerId: userId });
        return orders;
    } catch (error) {
        return createError("getMyOrders", "Mongoose", error);
    }
};
module.exports = { createOrder, getOrders, getOrder, getOrdersByCustomer, updateOrder, updateOrderStatus, deleteOrder, getMyOrders };