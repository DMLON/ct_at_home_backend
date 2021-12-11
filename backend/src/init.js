// use minimist to load the port number from command line
import minimist from 'minimist';
const argv = minimist(process.argv.slice(2))
import cluster from 'cluster';
import os from 'os'
const numCPUs = os.cpus().length;

import { server } from "./index.js";

// get loggers
import {loggerWarnings,loggerErrors ,loggerDefault } from './utils/loggers.js';

if (argv.mode == "CLUSTER"){
    // server in cluster mode
    if (cluster.isPrimary){
        console.log("Process is master")
        for(let i = 0; i < numCPUs; i++){
            cluster.fork();
        }
        cluster.on('exit', (worker, code, signal) => {
            loggerWarnings.warn(`worker ${worker.process.pid} died`);
        });
    }
    else{
        server();
    }
}
else if (argv.mode == "FORK" || argv.mode == undefined){
    server();
}
    

