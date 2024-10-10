const express = require("express");

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        let orders = await getOrders();
        res.send(orders);
    } catch (error) {
        handleError(res, error.status || 400, "get /orders/", error.message);
    }
});
module.exports = router;