const UserModel = require("../DB/mongodb/models/User");
const _ = require("lodash");
const { generateUserPassword, comaprePasswords } = require("../encrypt/bcrypt");
const { generateAuthToken } = require("../authetication/verification/jwt");
const { createError } = require("../utils/handleErrors");

const registerUser = async (newUser) => {
    try {
        newUser.password = generateUserPassword(newUser.password);
        let user = new UserModel(newUser);
        user = await user.save();

        user = _.pick(user, ["name", "email", "_id"]);

        return user;
    } catch (error) {
        return createError("registerUser", "Mongoose registerUser:", error);
    }
};

const getUser = async (userId) => {
    try {
        let user = await UserModel.findById(userId);
        return user;
    } catch (error) {
        return createError("getUser", "Mongoose", error);
    }
};

const getUsers = async () => {
    try {
        let users = await UserModel.find();
        return users;
    } catch (error) {
        return createError("getUsers", "Mongoose", error);
    }
};

const loginUser = async (email, password) => {
    try {
        const userFromDb = await UserModel.findOne({ email });

        if (!userFromDb) {
            const error = new Error("Invalid email or password");
            error.status = 401;
            return createError("loginUser", "Authentication", error);
        }
        if (!comaprePasswords(password, userFromDb.password)) {
            const error = new Error("Invalid email or password");
            error.status = 401;
            return createError("loginUser", "Authentication", error);
        }
        const token = generateAuthToken(userFromDb);
        return token;
    } catch (error) {
        return createError("loginUser", "Mongoose", error);
    }
};

const editUser = async (id, userInfo) => {
    try {
        let user = await UserModel.findByIdAndUpdate(id, userInfo, { new: true });
        return user;
    } catch (err) {
        return createError("editUser", "Mongoose:", err);
    }
};

const changeIsBusiness = async (id) => {
    try {
        let user = await getUser(id);
        let { isBusiness } = user;
        user.isBusiness = !isBusiness;
        user = await UserModel.findByIdAndUpdate(id, user);
        return user;
    } catch (err) {
        return createError("changeIsBusiness", "Mongoose:", err);
    }
}

const deleteUser = async (id) => {
    try {
        let user = await UserModel.findByIdAndDelete(id);
        return user;
    } catch (err) {
        return createError("deleteUser", "Mongoose:", err);
    }
};

const addYarnToUserCart = async (userId, yarnId, image, quantity) => {
    try {
        const user = await UserModel.findById(userId);
        const cartItem = await user.Cart.find(item => item.yarnId == yarnId);
        if (cartItem) {
            cartItem.quantity += quantity;
        } else {
            if (image && image.alt && image.alt.length >= 2) {
                user.Cart.push({ yarnId, image, quantity });
            } else {
                return createError("addYarnToUserCart", "Mongoose:", 'Invalid image data:' + image);
            }


        }
        await user.save();

        return user.Cart;
    } catch (error) {
        return createError("addYarnToUserCart", "Mongoose:", error);
    }
};
const removeYarnFromUserCart = async (id, yarnId) => {
    try {
        const user = await UserModel.findById(id);
        user.Cart = user.Cart.filter(item => item.yarnId != yarnId);
        await user.save();
        return user.Cart;
    } catch (error) {
        return createError("removeYarnFromUserCart", "Mongoose:", err);
    }
}


module.exports = { registerUser, getUser, getUsers, loginUser, editUser, changeIsBusiness, deleteUser, addYarnToUserCart, removeYarnFromUserCart };