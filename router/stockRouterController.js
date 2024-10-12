const express = require("express");
const validateStock = require("../validation/stockValidationService");
const auth = require("../authetication/authService");
const { getStock, updateStock, deleteStock } = require("../dataAccess/stockDataAccessService");

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        let stock = await getStocks();
        res.send(stock);
    } catch (error) {
        handleError(res, error.status || 400, "get /stock/", error.message);
    }
});

router.post("/", auth, async (req, res) => {
    try {
        const userInfo = req.user;
        if (!userInfo.isAdmin) {
            return handleError(res, 403, 'post("/stocks/")', "Only admin user can create new stock");
        }

        const errorMessage = validateStock(req.body);
        if (errorMessage !== "") {
            return handleError(res, 400, 'post("/stocks/")', "Validation error: " + errorMessage);
        }

        stock = await createStock(req.body);
        res.status(201).send(stock);
    } catch (error) {
        handleError(res, error.status || 400, 'post("/yarns/")', error.message);
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

router.put("/:id", auth, async (req, res) => {
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

        const errorMessage = validateStock(updStock);
        if (errorMessage !== "") {
            return handleError(res, 400, 'router.put("/stocks/:id")', "Validation error: " + errorMessage);
        }

        stock = await updateStock(id, updStock);
        res.send(stock);
    } catch (error) {
        handleError(res, error.status || 400, 'router.put("/stocks/:id")', error.message);
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
                'router.delete("/stocks/:id")',
                "Authorization Error: Only the user who is admin can delete this stock"
            );
        }

        let stock = await deleteStock(id);
        res.send(stock);
    } catch (error) {
        handleError(res, error.status || 400, 'router.delete("/stocks/:id")', error.message);
    }
});

module.exports = router;