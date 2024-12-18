const express = require("express");
const { handleError } = require("../utils/handleErrors");
const yarnsRouterController = require("./yarnsRouterController.js");
const usersRouterController = require("./usersRouterController.js");
const ordersRouterController = require("./ordersRouterController.js");
const stockRouterController = require("./stockRouterController.js");
const multerRouterController = require("./multerRouterController.js");

const router = express.Router();

router.use("/yarns", yarnsRouterController);
router.use("/users", usersRouterController);
router.use("/orders", ordersRouterController);
router.use("/stocks", stockRouterController);
router.use("/", multerRouterController);
router.use((req, res) => {
    return handleError(res, 404, "use", "Path not found");
});

module.exports = router;