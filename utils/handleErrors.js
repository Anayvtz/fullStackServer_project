const chalk = require("chalk");

const createError = (functionName, validator, error) => {
    error.message = `${functionName} : ${validator} Error: ${error.message}`;
    error.status = error.status || 400;
    throw new Error(error);
};

const handleError = (res, status, functionName, message = "") => {
    console.log(chalk.redBright(functionName + ":" + message));
    return res.status(status).send(functionName + ":" + message);
};

module.exports = { createError, handleError };