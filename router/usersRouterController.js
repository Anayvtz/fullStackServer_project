const express = require("express");
const { handleError } = require("../utils/handleErrors");
const auth = require("../authetication/authService");
const { validateUserRegistration, validateUserLogin } = require("../validation/userValidationService");
const { registerUser, loginUser, getUser, editUser, changeIsBusiness, deleteUser, getUsers, addYarnToUserCart, removeYarnFromUserCart, getUserCart, getUserCartEntity, deleteUserCart, getUserByEmail } = require("../dataAccess/usersDataAccessService");

const router = express.Router();

router.get("/", auth, async (req, res) => {
    try {
        const userInfo = req.user;

        if (!userInfo.isAdmin) {
            return handleError(
                res,
                403,
                'router.get("/users/")',
                "Authorization Error: Only user who is admin can get all users"
            );
        }
        let users = await getUsers();
        res.send(users);
    } catch (error) {
        return handleError(res, error.status || 400, "get /users/", error.message);
    }
});

router.post("/", async (req, res) => {
    try {
        const error = validateUserRegistration(req.body);
        if (error) return handleError(res, 400, 'router.post("/users/")', `Joi Error: ${error}`);

        let user = await registerUser(req.body);
        res.send(user);
    } catch (error) {
        return handleError(res, error.status || 400, 'router.post("/users/")', error.message);
    }
});

router.post("/login", async (req, res) => {
    try {
        const error = validateUserLogin(req.body);
        if (error) return handleError(res, 400, 'router.post("/users/login")', `Joi Error: ${error}`);

        let { email, password } = req.body;
        const token = await loginUser(email, password);
        res.send(token);
    } catch (error) {
        return handleError(res, error.status || 400, 'router.post("/users/login")', error.message);
    }
});

router.get("/search", auth, async (req, res) => {
    try {
        const userInfo = req.user;
        const { email } = req.query;

        if (!userInfo.isAdmin) {
            return handleError(
                res,
                403,
                'router.get("/users/search?email=")',
                "Authorization Error: Only admin can get user info by email"
            );
        }

        let user = await getUserByEmail(email);
        res.send(user);
    } catch (error) {
        return handleError(res, error.status || 400, 'router.get("/users/:id")', error.message);
    }
});
router.get("/:id", auth, async (req, res) => {
    try {
        const userInfo = req.user;
        const { id } = req.params;

        if (userInfo._id !== id && !userInfo.isAdmin) {
            return handleError(
                res,
                403,
                'router.get("/users/:id")',
                "Authorization Error: Only the same user or admin can get user info"
            );
        }

        let user = await getUser(id);
        res.send(user);
    } catch (error) {
        return handleError(res, error.status || 400, 'router.get("/users/:id")', error.message);
    }
});

router.put("/:id", auth, async (req, res) => {
    try {
        const userInfo = req.user;
        const { id } = req.params;

        if (userInfo._id !== id) {
            return handleError(
                res,
                403,
                'router.put("/users/:id")',
                "Authorization Error: Only the login user can edit user info"
            );
        }

        let user = await editUser(id, req.body);
        res.send(user);
    } catch (error) {
        return handleError(res, error.status || 400, 'router.put("/users/:id")', error.message);
    }
});

router.get("/:id/cart", auth, async (req, res) => {
    try {
        const userInfo = req.user;
        const { id } = req.params;

        if (userInfo._id !== id) {
            return handleError(
                res,
                403,
                'router.get("/users/:id")',
                "Authorization Error: Only the login user can get user info"
            );
        }

        let cart = await getUserCart(id);
        return res.send(cart);
    } catch (error) {
        return handleError(res, error.status || 400, 'router.get("/users/:id/cart")', error.message);
    }
});

router.put("/:id/cart", auth, async (req, res) => {
    try {
        const userInfo = req.user;
        const { id } = req.params;

        if (userInfo._id !== id) {
            return handleError(
                res,
                403,
                'router.put("/users/:id")',
                "Authorization Error: Only the login user can edit user info"
            );
        }

        const { yarnId, image, quantity, price } = req.body;

        let cart = await addYarnToUserCart(id, yarnId, image, quantity, price);
        return res.send(cart);
    } catch (error) {
        return handleError(res, error.status || 400, 'router.put("/users/:id/cart")', error.message);
    }
});

router.delete("/:id/cart/:yarnId", auth, async (req, res) => {
    try {
        const userInfo = req.user;
        const { id, yarnId } = req.params;

        if (userInfo._id !== id) {
            return handleError(
                res,
                403,
                'router.delete("/users/:id/cart/:yarnId")',
                "Authorization Error: Only the login user can edit user info"
            );
        }
        let cart = await removeYarnFromUserCart(id, yarnId);

        return res.send(cart);
    } catch (error) {
        return handleError(res, error.status || 400, 'router.delete("/users/:id/cart/:yarnId")', error.message);
    }
});
router.delete("/:id/cart", auth, async (req, res) => {
    try {
        const userInfo = req.user;
        const { id } = req.params;

        if (userInfo._id !== id) {
            return handleError(
                res,
                403,
                'router.delete("/users/:id/cart")',
                "Authorization Error: Only the login user can edit user info"
            );
        }
        let cart = await deleteUserCart(id);
        return res.send(cart);
    } catch (error) {
        return handleError(res, error.status || 400, 'router.get("/users/:id/cart")', error.message);
    }
});
router.get("/:id/cart/:yarnId", auth, async (req, res) => {
    try {
        const userInfo = req.user;
        const { id, yarnId } = req.params;

        if (userInfo._id !== id) {
            return handleError(
                res,
                403,
                'router.delete("/users/:id/cart/:yarnId")',
                "Authorization Error: Only the login user can edit user info"
            );
        }

        let cartEntity = await getUserCartEntity(id, yarnId);
        return res.send(cartEntity);
    } catch (error) {
        return handleError(res, error.status || 400, 'router.get("/users/:id/cart/:yarnId")', error.message);
    }
});

router.patch("/:id", auth, async (req, res) => {
    try {
        const userInfo = req.user;
        const { id } = req.params;

        if (!userInfo.isAdmin) {
            return handleError(
                res,
                403,
                'router.patch("/users/:id")',
                "Authorization Error: Only the admin user can edit isBusiness"
            );
        }

        let user = await changeIsBusiness(id);
        res.send(user);
    } catch (error) {
        return handleError(res, error.status || 400, 'router.patch("/users/:id")', error.message);
    }
});

router.delete("/:id", auth, async (req, res) => {
    try {
        const userInfo = req.user;
        const { id } = req.params;

        if (!userInfo.isAdmin) {
            return handleError(
                res,
                403,
                'router.delete("/users/:id")',
                "Authorization Error: Only the  admin can delete user info"
            );
        }

        let user = await deleteUser(id);
        res.send(user);
    } catch (error) {
        return handleError(res, error.status || 400, 'router.delete("/users/:id")', error.message);
    }
});
module.exports = router;