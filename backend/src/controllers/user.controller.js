
import {userServiceAuth} from "../services/index.js";
const passport = userServiceAuth.passport;

export async function logout(req, res){
    const ip = req.clientIp;
    loggerDefault.info(`[${ip}] - POST /auth/logout`);
    req.session.destroy((err) => {
        let result = null;
        if (!err) result = { error: false, status: "ok", redirectURL: "/" };
        else result = { error: true, status: err };
        res.send(result);
    });
};

//Place holder, only called after signup returns good response, will not call res due to signup already calling it
export async function signupSuccess(req, res){
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
    res.status(500).send(err);
}