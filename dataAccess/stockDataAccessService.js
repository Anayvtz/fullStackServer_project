const StockModel = require("../DB/mongodb/models/Stock");
const { updateYarnQuantity } = require("./yarnsDataAccessService");

const createStock = async (newStock) => {
    try {
        let stock = new StockModel(newStock);
        stock = await stock.save();
        return stock;
    } catch (error) {
        return createError("createStock", "Mongoose", error);
    }
}

const getStocks = async () => {
    try {
        let stocks = await StockModel.find();
        return stocks;
    } catch (error) {
        return createError("getYarns", "Mongoose", error);
    }
};

const getStock = async (stockId) => {
    try {
        let stock = await StockModel.findById(stockId);
        return stock;
    } catch (error) {
        return createError("getStock", "Mongoose", error);
    }
};

const updateStock = async (stockId, updStock) => {
    try {
        let stock = await StockModel.findByIdAndUpdate(stockId, updStock, { new: true });
        let { yarnId, quantity } = stock;
        updateYarnQuantity(yarnId, quantity);
        return stock;
    } catch (error) {
        return createError("updateStock", "Mongoose", error);
    }
};

const deleteStock = async (stockId) => {
    try {
        let stock = await StockModel.findByIdAndDelete(stockId);
        let { yarnId, quantity } = stock;
        updateYarnQuantity(yarnId, quantity);
        return stock;
    } catch (error) {
        return createError("deleteStock", "Mongoose", error);
    }
};

module.exports = { createStock, getStocks, getStock, updateStock, deleteStock }