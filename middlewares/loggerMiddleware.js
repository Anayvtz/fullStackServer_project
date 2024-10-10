
const config = require("config");
const morganLogger = require("../logger/morganLogger");

const logger = config.get("LOGGER");

const loggerMiddleware = () => {
    if (logger === "morgan") {
        return morganLogger;
    }
    throw new Error(" no logger defined");
};

module.exports = loggerMiddleware;