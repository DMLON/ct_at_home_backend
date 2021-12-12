import dotenv from "dotenv"

dotenv.config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
import clientFunc from 'twilio';
const client = clientFunc(accountSid, authToken);

const ADMIN_PHONE = process.env.ADMIN_PHONE;
const TWILIO_PHONE = process.env.TWILIO_PHONE;

import {loggerWarnings,loggerErrors ,loggerDefault } from '../utils/loggers.js';

/**
 *  Sends a whatsapp to the admin
    @param content
 */
export async function sendMessageAdmin(content){
    sendMessage(ADMIN_PHONE,content);
}

/**
 *  Sends a whatsapp to the given phone number
    @param to - Phone number without +
    @param content
 */
export function sendMessage(to, body) {
    client.messages.create({
        body: body,
        to: `whatsapp:+${to}`,
        from: `whatsapp:${TWILIO_PHONE}`,
        })
        .then(message => {
            loggerDefault.info(`Message sent succesfully to ${to} with sid ${message.sid}`);
        })
        .catch(err => {
            loggerErrors.error(`Error sending message to ${to} with error ${err}`);
        })
        .done();
    loggerDefault.info(`WPP sent to ${to}`);
}