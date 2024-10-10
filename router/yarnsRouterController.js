const express = require("express");
const { handleError } = require("../utils/handleErrors");
const { getYarns, createYarn, getYarn, deleteYarn } = require("../dataAccess/yarnsDataAccessService");
const auth = require("../authetication/authService");
const validateYarn = require("../validation/yarnValidationService");
const normalizeYarn = require("../normalization/normalizeYarn");

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

        const errorMessage = validateYarn(req.body);
        if (errorMessage !== "") {
            return handleError(res, 400, 'post("/yarns/")', "Validation error: " + errorMessage);
        }

        let yarn = await normalizeYarn(req.body);
        yarn = await createYarn(yarn);
        res.status(201).send(yarn);
    } catch (error) {
        handleError(res, error.status || 400, 'post("/yarns/")', error.message);
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
                "Authorization Error: Only the user who created the business card or admin can update its details"
            );
        }

        const errorMessage = validateYarn(updYarn);
        if (errorMessage !== "") {
            return handleError(res, 400, 'router.put("/yarns/:id")', "Validation error: " + errorMessage);
        }

        let yarn = await normalizeYarn(updYarn);
        yarn = await updateCard(id, yarn);
        res.send(yarn);
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
                "Authorization Error: Only the user who created the business card or admin can delete this card"
            );
        }

        let yarn = await deleteYarn(id);
        res.send(yarn);
    } catch (error) {
        handleError(res, error.status || 400, 'router.delete("/yarns/:id")', error.message);
    }
});

module.exports = router;