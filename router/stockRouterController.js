const express = require("express");
const validateStock = require("../validation/stockValidationService");
const auth = require("../authetication/authService");
const { getStock, updateStock, deleteStock, getStocks, createStock } = require("../dataAccess/stockDataAccessService");
const { handleError } = require("../utils/handleErrors");

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        let stock = await getStocks();
        res.send(stock);
    } catch (error) {
        handleError(res, error.status || 400, "get /stock/", error.message);
    }
});

router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        let stock = await getStock(id);
        res.send(stock);
    } catch (error) {
        handleError(res, error.status || 400, 'router.get("/stocks/:id")', error.message);
    }
});

router.patch("/:id", auth, async (req, res) => {
    try {
        const userInfo = req.user;
        const updStock = req.body;
        const { id } = req.params;

        if (!userInfo.isAdmin) {
            return handleError(
                res,
                403,
                'router.put("/stocks/:id")',
                "Authorization Error: Only the user who is admin can update stock details"
            );
        }
        console.log("stock router.patch/id. id:", id);
        console.log("stock router.patch/id. updStock.yarnId:", updStock.yarnId);

        const errorMessage = validateStock(updStock);
        if (errorMessage !== "") {
            return handleError(res, 400, 'router.put("/stocks/:id")', "Validation error: " + errorMessage);
        }

        let objectStockYarn = await updateStock(id, updStock);
        res.send(objectStockYarn);
    } catch (error) {
        handleError(res, error.status || 400, 'router.put("/stocks/:id")', error.message);
    }
});

module.exports = router;