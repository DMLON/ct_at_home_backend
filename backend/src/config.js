
function setup(){
    const dotenv = require("dotenv");
    dotenv.config();

    const argv = require('minimist')(process.argv.slice(2));

    const { MONGODB_URI, SECRET} = process.env;

    const NODE_ENV = argv.env || process.env.NODE_ENV || 'development';
    const PORT = process.env.PORT || argv.port || 8080;
    if (MONGODB_URI == undefined || SECRET == undefined) {
        console.log("Please set the environment variables MONDODB_URI, SECRET");
        process.exit(1);
    }    
    
    return { MONGODB_URI, SECRET, NODE_ENV, POR};
}

const { MONGODB_URI, SECRET, NODE_ENV, PORT } = setup();

export default {
    MONGODB_URI, SECRET, NODE_ENV, PORT
}