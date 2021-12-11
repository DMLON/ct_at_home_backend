import dotenv from "dotenv"

dotenv.config();

import { createTransport } from "nodemailer";
import {loggerWarnings,loggerErrors ,loggerDefault } from '../utils/loggers.js';

const transporter = createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
        user: process.env.ADMIN_EMAIL,
        pass: process.env.ADMIN_EMAIL_PASS
    }
});

const baseMailOptions = {
    from: 'Servidor Node.js',
    to: process.env.ADMIN_EMAIL,
    subject: '',
    html: ''
};


export const sendEmail =  async (subject,content) => {
    try{
        const mailOptions = {...baseMailOptions,subject,html:content};
        const info = await transporter.sendMail(mailOptions);
        loggerDefault.info('Message sent: %s', info.messageId);
    }
    catch(error){
        loggerErrors.error(error);
    }
}