const express = require("express");
const { handleError } = require("../utils/handleErrors");
const { getYarns, createYarn, getYarn, deleteYarn, getYarnBySize, updateYarn } = require("../dataAccess/yarnsDataAccessService");
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
                "Authorization Error: Only the user who is admin can update its details"
            );
        }

        const errorMessage = validateYarn(updYarn);
        if (errorMessage !== "") {
            return handleError(res, 400, 'router.put("/yarns/:id")', "Validation error: " + errorMessage);
        }

        let yarn = await normalizeYarn(updYarn);
        yarn = await updateYarn(id, yarn);
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
                "Authorization Error: Only the user who is admin can delete this yarn"
            );
        }

        let yarn = await deleteYarn(id);
        res.send(yarn);
    } catch (error) {
        handleError(res, error.status || 400, 'router.delete("/yarns/:id")', error.message);
    }
});

router.get("/search", async (req, res) => {
    try {
        const size = parseInt(req.query.size);
        let yarns = getYarnBySize(size);
        res.send(yarns);
    } catch (error) {
        handleError(res, error.status || 400, 'router.get("/yarns/search")', error.message);
    }
});
module.exports = router;