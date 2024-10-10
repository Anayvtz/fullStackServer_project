const express = require("express");

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        let stock = await getStock();
        res.send(stock);
    } catch (error) {
        handleError(res, error.status || 400, "get /stock/", error.message);
    }
});
module.exports = router;