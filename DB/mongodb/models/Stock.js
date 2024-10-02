const mongoose = require("mongoose");



const stockSchema = new mongoose.Schema({
    yarnId: mongoose.Schema.Types.ObjectId,
    quantity: Number
});

const StockSchema = mongoose.model("stock", stockSchema);

module.exports = StockSchema;