
import {userServiceAuth} from "../services/index.js";
import { sendEmail } from "../utils/emailSender.js";
import { loggerDefault, loggerErrors } from "../utils/loggers.js";
import { prettyfyUser } from "../utils/prettyfyObjects.js";

const passport = userServiceAuth.passport;

export async function logout(req, res){
    req.session.destroy((err) => {
        let result = null;
        if (!err) result = { error: false, status: "ok", redirectURL: "/" };
        else result = { error: true, status: err };
        res.send(result);
    });
};

//Place holder, only called after signup returns good response, will not call res due to signup already calling it
export async function signupSuccess(req, res){

    //Send a whatsapp to the admin with the user information
    const userContent = prettyfyUser(req,req.user);

    await sendEmail("New user",userContent)
    res.status(200).send(req.user);
}
export async function signupError(err,req,res,next){
    res.status(500).send(err);
}

//Place holder, only called after login returns good response, will not call res due to login already calling it
export async function loginSuccess(req, res){
    res.status(200).send(req.user);
}

export async function loginError(err,req,res,next){
    loggerErrors.error(`POST /auth/login - ${err}`);
    res.status(500).send(err);
}