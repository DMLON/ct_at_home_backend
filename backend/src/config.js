import dotenv from "dotenv";
import minimist from "minimist";
function setup() {
    

    dotenv.config();

    const argv = minimist(process.argv.slice(2));
    const { MONGODB_URI, SECRET, ADMIN_EMAIL, ADMIN_EMAIL_PASS, ADMIN_PHONE, TWILIO_AUTH_TOKEN, TWILIO_ACCOUNT_SID, TWILIO_PHONE, SESSION_AGE_SECONDS } =
        process.env;

    const NODE_ENV = argv.env || process.env.NODE_ENV || "development";
    const PORT = process.env.PORT || argv.port || 8080;
    if (MONGODB_URI == undefined || SECRET == undefined) {
        console.log("Please set the environment variables MONDODB_URI, SECRET");
        process.exit(1);
    }

    

    return {
        MONGODB_URI,
        SECRET,
        NODE_ENV,
        PORT,
        ADMIN_EMAIL,
        ADMIN_EMAIL_PASS,
        ADMIN_PHONE,
        TWILIO_AUTH_TOKEN,
        TWILIO_ACCOUNT_SID,
        TWILIO_PHONE,
        SESSION_AGE_SECONDS
    };
}

// Due to ES6 not having __dirname, we need to export dirname like this
import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(dirname(fileURLToPath(import.meta.url)));

const {
    MONGODB_URI,
    SECRET,
    NODE_ENV,
    PORT,
    ADMIN_EMAIL,
    ADMIN_EMAIL_PASS,
    ADMIN_PHONE,
    TWILIO_AUTH_TOKEN,
    TWILIO_ACCOUNT_SID,
    TWILIO_PHONE,
    SESSION_AGE_SECONDS
} = setup();

export default {
    MONGODB_URI,
    SECRET,
    NODE_ENV,
    PORT,
    ADMIN_EMAIL,
    ADMIN_EMAIL_PASS,
    ADMIN_PHONE,
    TWILIO_AUTH_TOKEN,
    TWILIO_ACCOUNT_SID,
    TWILIO_PHONE,
    __dirname,
    SESSION_AGE_SECONDS
};
