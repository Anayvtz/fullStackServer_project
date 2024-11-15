const UserModel = require("../DB/mongodb/models/User");
const _ = require("lodash");
const { generateUserPassword, comaprePasswords } = require("../encrypt/bcrypt");
const { generateAuthToken } = require("../authetication/verification/jwt");
const { createError } = require("../utils/handleErrors");
const { getYarnQuantity } = require("./yarnsDataAccessService");

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

const getUserByEmail = async (email) => {
    try {
        let user = await UserModel.find({ email: email });
        return user;
    } catch (error) {
        return createError("getUserByEmail", "Mongoose", error);
    }
}
const loginUser = async (email, password) => {
    try {
        console.log("loginUser email:", email);
        console.log("loginUser password:", password);

        const userFromDb = await UserModel.findOne({ email });

        if (!userFromDb) {
            const error = new Error("Invalid email or password no userFromDb");
            error.status = 401;
            return createError("loginUser", "Authentication", error);
        }
        if (!comaprePasswords(password, userFromDb.password)) {
            const error = new Error("Invalid email or password. compare password failed");
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

const addYarnToUserCart = async (userId, yarnId, image, quantity, price) => {
    try {
        const user = await UserModel.findById(userId);
        const cartItem = user.Cart.find(item => item.yarnId == yarnId);
        const yarnQuantity = await getYarnQuantity(yarnId);
        if (cartItem) {
            if (cartItem.quantity == yarnQuantity) {
                return createError("addYarnToUserCart", "server:", "cant add more yarn max quantity in stock reached");
            }
            cartItem.quantity += quantity;
            if (cartItem.quantity > yarnQuantity) {
                cartItem.quantity = yarnQuantity;
            }
        } else {
            if (quantity > yarnQuantity) {
                quantity = yarnQuantity;
            }
            if (image && image.alt && image.alt.length >= 2) {
                console.log("image.alt:" + image.alt);

                user.Cart.push({ yarnId, image, quantity, price });
            } else {
                return createError("addYarnToUserCart", "Mongoose:", 'Invalid image data:' + image);
            }


        }

        await user.save();
        console.log("after user.save");

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
        return createError("removeYarnFromUserCart", "Mongoose:", error);
    }
}

const getUserCart = async (id) => {
    try {
        const user = await UserModel.findById(id);
        return user.Cart;
    }
    catch (error) {
        return createError("getUserCart", "Mongoose:", error);
    }
}
const getUserCartEntity = async (id, yarnId) => {
    try {
        const user = await UserModel.findById(id);

        for (let i = 0; i < user.Cart.length; i++) {
            if (user.Cart[i].yarnId == yarnId) {
                console.log("getUserCartEntity yarnId:", user.Cart[i].yarnId);
                console.log("getUserCartEntity quantity:", user.Cart[i].quantity);

                return user.Cart[i];
            }
        }
        return null;

    } catch (error) {
        return createError("getUserCartEntity", "Mongoose:", error);
    }
}

const deleteUserCart = async (id) => {
    try {
        const user = await UserModel.findById(id);
        user.Cart = [];
        user.save();
        return user.Cart;
    } catch (error) {
        return createError("deleteUserCart", "Mongoose:", error);
    }
}
module.exports = { registerUser, getUser, getUsers, loginUser, editUser, changeIsBusiness, deleteUser, addYarnToUserCart, removeYarnFromUserCart, getUserCart, getUserCartEntity, deleteUserCart, getUserByEmail };