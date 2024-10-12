const express = require("express");
const chalk = require("chalk");
const corsmiddleware = require("./middlewares/cors");
const loggerMiddleware = require("./middlewares/loggerMiddleware");
const router = require("./router/router");
const { connectToDb } = require("./DB/dbService");
const { handleError } = require("./utils/handleErrors");
const registerAdminUser = require("./initialData/registerAdminUser");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8185;

app.use(corsmiddleware);
app.use(express.json());

app.use(loggerMiddleware());

app.use(express.static("./public"));

app.use(router);

app.use((err, req, res, next) => {
    const message = err || "internal error of the server";
    return handleError(res, 500, "app.use fallback error", message);
});

app.listen(PORT, async () => {
    console.log(chalk.yellow("app is listening to port " + PORT));
    await connectToDb();
    await registerAdminUser();
});