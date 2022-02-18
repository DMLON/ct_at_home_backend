import config from "../config";
import { ServerInfo } from "../database/dtos/serverInfo.dto";


export async function getConfigs(req, res) {
    try {
        const serverInfo = new ServerInfo(config)
        res.status(200).json(serverInfo);
    } catch (error) {
        loggerErrors.error(error.message);
        res.status(error?.status || 400).json(error);
    }
}