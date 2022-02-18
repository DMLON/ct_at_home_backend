
import { argv, platform, version, memoryUsage, execPath, cwd, pid } from "process";
import os from ('os')

const cliArgs = argv.slice(2).join(" ").toString();
const numCPUs = os.cpus().length;

const processInfo = {
    commandLineArgs: cliArgs,
    OS: platform,
    nodeVersion: version,
    RSSMemory: memoryUsage().rss,
    nodePath: execPath,
    projectPath: cwd(),
    processId: pid,
    numCPUs:numCPUs
}


export class ServerInfo{
    constructor({PORT, MONGODB_URI, NODE_ENV, ADMIN_PHONE, ADMIN_EMAIL, SESSION_AGE_SECONDS}){
        this.dbURL = MONGODB_URI;
        this.nodeEnv = NODE_ENV;
        this.adminPhone = ADMIN_PHONE;
        this.adminEmail = ADMIN_EMAIL;
        this.serverPort = PORT;
        this.sessionAgeSeconds = SESSION_AGE_SECONDS;
        this.serverInternals = {
            ...processInfo,
            memory:Math.round(processInfo.RSSMemory/1024/1024),
        }
    }
}