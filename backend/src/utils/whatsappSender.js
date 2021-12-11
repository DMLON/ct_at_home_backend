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
export async function sendMessage(to, body) {
    try {
        const message = await client.messages.create({
        body: body,
        to: `whatsapp:+${to}`,
        from: `whatsapp:${TWILIO_PHONE}`,
        });
        loggerDefault.info(`WPP sent succesfully with SID: ${message.sid}`);
    } catch (e) {
        loggerErrors.error(e)
    }
}