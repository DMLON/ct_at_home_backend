import config from "../config.js";
import { ServerInfo } from "../database/dtos/serverInfo.dto.js";


export async function getConfigs(req, res) {
    try {
        const serverInfo = new ServerInfo(config)
        res.status(200).json(serverInfo);
    } catch (error) {
        loggerErrors.error(error.message);
        res.status(error?.status || 400).json(error);
    }
}