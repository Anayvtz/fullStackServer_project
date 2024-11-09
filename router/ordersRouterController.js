const express = require("express");
const auth = require("../authetication/authService");
const validateOrders = require("../validation/ordersValidationService");
const { createOrder, getOrder, updateOrder, deleteOrder, getMyOrders, updateOrderStatus, getOrdersByCustomer, getOrders } = require("../dataAccess/ordersDataAccessService");
const normalizeOrder = require("../normalization/normalizeOrder");
const { handleError } = require("../utils/handleErrors");
const { deleteUserCart } = require("../dataAccess/usersDataAccessService");

const router = express.Router();

router.get("/", auth, async (req, res) => {
    try {
        const userInfo = req.user;
        if (!userInfo.isAdmin) {
            return handleError(
                res,
                403,
                'router.get("/")',
                "Authorization Error: Only the  admin can get all orders of all customers"
            );
        }
        let orders = await getOrders();
        res.send(orders);
    } catch (error) {
        handleError(res, error.status || 400, "get /orders/", error.message);
    }
});
router.post("/:id", auth, async (req, res) => {
    try {
        const { id } = req.params;
        const userInfo = req.user;
        if (userInfo._id != id) {
            return handleError(res, 403, 'post("/orders/:id")', "Only login user can create new order");
        }

        const errorMessage = validateOrders(req.body);
        if (errorMessage !== "") {
            return handleError(res, 400, 'post("/orders/:id")', "Validation error: " + errorMessage);
        }

        let order = await normalizeOrder(id, req.body);
        order = await createOrder(order);
        await deleteUserCart(id);
        res.status(201).send(order);
    } catch (error) {
        handleError(res, error.status || 400, 'post("/orders/:id")', error.message);
    }
});
router.get("/search", auth, async (req, res) => {
    try {
        const userInfo = req.user;
        if (!userInfo.isAdmin) {
            return handleError(
                res,
                403,
                'router.get("/search?customerId")',
                "Authorization Error: Only the  admin can search orders details of customers"
            );
        }
        const { customerId } = req.query;
        let orders = await getOrdersByCustomer(customerId);
        res.send(orders);
    } catch (error) {
        handleError(res, error.status || 400, 'router.get("/orders/search?customerId=")', error.message);
    }
});
router.get("/my-orders/:id", auth, async (req, res) => {
    try {
        const { id } = req.params;
        const userInfo = req.user;
        if (userInfo._id != id && !userInfo.isAdmin) {
            return handleError(res, 403, 'router.get("/my-orders/:id")', "Only login user or admin can get my orders");
        }
        let orders = await getMyOrders(userInfo._id);
        res.send(orders);
    } catch (error) {
        handleError(res, error.status || 400, 'router.get("/my-orders/:id")', error.message);
    }
});
router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        let order = await getOrder(id);
        res.send(order);
    } catch (error) {
        handleError(res, error.status || 400, 'router.get("/orders/:id")', error.message);
    }
});

router.put("/:id", auth, async (req, res) => {
    try {
        const userInfo = req.user;
        const { customerId } = req.body;
        const updOrder = req.body;
        const { id } = req.params;

        if (userInfo._id != customerId && !userInfo.isAdmin) {
            return handleError(
                res,
                403,
                'router.put("/orders/:id")',
                "Authorization Error: Only the login user or admin can update order details"
            );
        }

        const errorMessage = validateOrders(updOrder);
        if (errorMessage !== "") {
            return handleError(res, 400, 'router.put("/orders/:id")', "Validation error: " + errorMessage);
        }

        let order = await updateOrder(id, updOrder);
        res.send(order);
    } catch (error) {
        handleError(res, error.status || 400, 'router.put("/orders/:id")', error.message);
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
                'router.delete("/orders/:id")',
                "Authorization Error: Only the user who is admin can delete this order"
            );
        }

        let order = await deleteOrder(id);
        res.send(order);
    } catch (error) {
        handleError(res, error.status || 400, 'router.delete("/orders/:id")', error.message);
    }
});

router.patch("/:id", auth, async (req, res) => {
    try {
        const { id } = req.params;
        const userInfo = req.user;
        if (!userInfo.isAdmin) {
            return handleError(res, 403, 'router.patch("/:id")', "Only admin can update order status");
        }

        let order = await updateOrderStatus(id);
        res.send(order);
    } catch (error) {
        handleError(res, error.status || 400, 'router.patch("/:id")', error.message);
    }
});
module.exports = router;