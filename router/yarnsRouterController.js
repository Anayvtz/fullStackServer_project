const express = require("express");
const { handleError } = require("../utils/handleErrors");
const { getYarns, createYarn, getYarn, deleteYarn, getYarnBySize, updateYarn } = require("../dataAccess/yarnsDataAccessService");
const auth = require("../authetication/authService");
const validateYarn = require("../validation/yarnValidationService");
const normalizeYarn = require("../normalization/normalizeYarn");
const validateStock = require("../validation/stockValidationService");
const { createStock, findStockByYarnId, deleteStock, updateStock } = require("../dataAccess/stockDataAccessService");

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        let yarns = await getYarns();
        res.send(yarns);
    } catch (error) {
        handleError(res, error.status || 400, "get /yarns/", error.message);
    }
});

router.post("/", auth, async (req, res) => {
    try {
        const userInfo = req.user;
        if (!userInfo.isAdmin) {
            return handleError(res, 403, 'post("/yarns/")', "Only admin user can create new yarn");
        }
        console.log("router.post('/yarns/ req.body.image", req.body.image);
        const errorMessage = validateYarn(req.body);
        if (errorMessage !== "") {
            return handleError(res, 400, 'post("/yarns/") validateYarn', "Validation error: " + errorMessage);
        }

        let yarn = await normalizeYarn(req.body);
        yarn = await createYarn(yarn);

        let stock = { yarnId: yarn._id.toString(), image: { imageurl: yarn.image.imageurl, alt: yarn.image.alt }, quantity: yarn.quantityInStock };
        const errorMsg = validateStock(stock);
        if (errorMsg !== "") {
            return handleError(res, 400, 'post("/yarns/") validateStock', "Validation error: " + errorMsg);
        }
        stock = await createStock(stock);

        res.status(201).send({ yarn, stock });
    } catch (error) {
        handleError(res, error.status || 400, 'post("/yarns/")', error.message);
    }
});

router.get("/search", async (req, res) => {
    try {
        const size = parseInt(req.query.size);
        let yarns = await getYarnBySize(size);
        res.send(yarns);
    } catch (error) {
        handleError(res, error.status || 400, 'router.get("/yarns/search")', error.message);
    }
});
router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        let yarn = await getYarn(id);
        res.send(yarn);
    } catch (error) {
        handleError(res, error.status || 400, 'router.get("/yarns/:id")', error.message);
    }
});

router.put("/:id", auth, async (req, res) => {
    try {
        const userInfo = req.user;
        const updYarn = req.body;
        const { id } = req.params;

        if (!userInfo.isAdmin) {
            return handleError(
                res,
                403,
                'router.put("/yarns/:id")',
                "Authorization Error: Only the user who is admin can update its details"
            );
        }

        const errorMessage = validateYarn(updYarn);
        if (errorMessage !== "") {
            return handleError(res, 400, 'router.put("/yarns/:id")', "Validation error: " + errorMessage);
        }

        let yarn = await normalizeYarn(updYarn);

        let stock = await findStockByYarnId(id);
        console.log("yarn id:" + id);
        console.log("stock yarn id:" + stock);


        console.log("UPD stock yarn id:" + stock.yarnId);
        console.log("B4 yarn quantityInStock:" + yarn.quantityInStock);
        console.log("B4 stock.quantity:" + stock.quantity);

        stock.quantity = yarn.quantityInStock;
        console.log("AFTER stock.quantity:" + stock.quantity);
        await stock.save();
        yarn = await updateYarn(id, yarn);
        // let stockYarnObject = await updateStock(stock._id, stock);
        res.send({ yarn, stock });
    } catch (error) {
        handleError(res, error.status || 400, 'router.put("/yarns/:id")', error.message);
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
                'router.delete("/yarns/:id")',
                "Authorization Error: Only the user who is admin can delete this yarn"
            );
        }


        let stock = await findStockByYarnId(id);
        stock = await deleteStock(stock._id);
        let yarn = await deleteYarn(id);
        res.send({ yarn, stock });
    } catch (error) {
        handleError(res, error.status || 400, 'router.delete("/yarns/:id")', error.message);
    }
});


module.exports = router;