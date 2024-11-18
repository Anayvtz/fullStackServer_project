const StockModel = require("../DB/mongodb/models/Stock");
const { createError } = require("../utils/handleErrors");
const { updateYarnQuantity } = require("./yarnsDataAccessService");

const createStock = async (newStock) => {
    try {
        console.log("createStock. stock.image:", newStock.image)
        let stock = new StockModel(newStock);
        console.log("createStock.after stockmodel. stock.image: ", stock.image);

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
        let stock = await StockModel.findById(stockId);
        stock.quantity = updStock.quantity;

        stock = await stock.save();
        let { yarnId, quantity } = stock;
        let yarn = updateYarnQuantity(yarnId, quantity);
        return { stock, yarn };
    } catch (error) {
        return createError("updateStock", "Mongoose", error);
    }
};
const updateStockImage = async (stockId, updStock) => {
    try {
        let stock = await StockModel.findById(stockId);
        stock.image.imageurl = updStock.image.imageurl;
        stock.image.alt = updStock.image.alt;
        console.log("updateStock. stock.image:", stock.image);

        stock = await stock.save();
        return stock;
    } catch (error) {
        return createError("updateStock", "Mongoose", error);
    }
};
const deleteStock = async (stockId) => {
    try {
        let stock = await StockModel.findByIdAndDelete(stockId);
        let { yarnId, quantity } = stock;
        await updateYarnQuantity(yarnId, quantity);
        return stock;
    } catch (error) {
        return createError("deleteStock", "Mongoose", error);
    }
};

const findStockByYarnId = async (yarnId) => {
    try {
        if (!yarnId) return createError("findStockByYarnId", "yarnId", "yarnId is null");
        let stock = await StockModel.findOne({ yarnId: yarnId });
        if (!stock) return createError("findStockByYarnId", "stockModel.find", "stock is null. not found");
        console.log("stock._id:" + stock._id);
        console.log("stock.yarnId:" + stock.yarnId);
        console.log("stock.image:", stock.image);

        return stock;
    } catch (error) {
        return createError("findStockByYarnId", "Mongoose", error);
    }
}
module.exports = { createStock, getStocks, getStock, updateStock, deleteStock, findStockByYarnId, updateStockImage }