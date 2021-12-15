import { loggerDefault } from "../utils/loggers.js";

export const LogInfoMethod = (req, res, next) => {
    let method = req.method;
    let url = req.url;
    let status = res.statusCode;
    let log = `${method}:${url} ${status}`;
    loggerDefault.info(log)
    next();
};
