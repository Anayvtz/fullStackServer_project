const YarnModel = require("../DB/mongodb/models/Yarn");
const { createError } = require("../utils/handleErrors");



const createYarn = async (newYarn) => {
    try {
        let yarn = new YarnModel(newYarn);
        yarn = await yarn.save();
        return yarn;
    } catch (error) {
        return createError("createYarn", "Mongoose", error);
    }
}

const getYarns = async () => {
    try {
        let yarns = await YarnModel.find();
        return yarns;
    } catch (error) {
        return createError("getYarns", "Mongoose", error);
    }
};

const getYarn = async (yarnId) => {
    try {
        let yarn = await YarnModel.findById(yarnId);
        return yarn;
    } catch (error) {
        return createError("getYarn", "Mongoose", error);
    }
};
const getYarnBySize = async (yarnSz) => {
    try {
        let yarns = await YarnModel.find({ yarnSize: yarnSz });
        return yarns;
    } catch (error) {
        return createError("getYarnBySize", "Mongoose", error);
    }
};

const updateYarn = async (yarnId, newYarn) => {
    try {
        let yarn = await YarnModel.findById(yarnId);
        yarn.title = newYarn.title;
        yarn.subtitle = newYarn.subtitle;
        yarn.description = newYarn.description;
        yarn.yarnSize = newYarn.yarnSize;
        yarn.quantityInStock = newYarn.quantityInStock;
        yarn.image.alt = newYarn.image.alt;
        yarn.price = newYarn.price;
        yarn.save();
        return yarn;
    } catch (error) {
        return createError("updateYarn", "Mongoose", error);
    }
};
const updateYarnQuantity = async (yarnId, quantity) => {
    try {
        let yarn = await YarnModel.findById(yarnId);
        yarn.quantityInStock = quantity;
        yarn = await yarn.save();
        return yarn;
    } catch (error) {
        return createError("updateYarnQuantity", "Mongoose", error);
    }
};
const getYarnQuantity = async (yarnId) => {
    try {
        let yarn = await YarnModel.findById(yarnId);
        return yarn.quantityInStock;
    } catch (error) {
        return createError("getYarnQuantity", "Mongoose", error);
    }
}
const deleteYarn = async (yarnId) => {
    try {
        let yarn = await YarnModel.findByIdAndDelete(yarnId);
        return yarn;
    } catch (error) {
        return createError("deleteYarn", "Mongoose", error);
    }
};

module.exports = { createYarn, getYarns, getYarn, getYarnBySize, updateYarn, deleteYarn, updateYarnQuantity, getYarnQuantity };