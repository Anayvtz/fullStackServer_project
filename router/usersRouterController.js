const express = require("express");
const { handleError } = require("../utils/handleErrors");

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        let users = await getUsers();
        res.send(users);
    } catch (error) {
        return handleError(res, error.status || 400, "get /users/", error.message);
    }
});
module.exports = router;