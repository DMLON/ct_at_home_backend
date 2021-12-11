
import {userServiceAuth} from "../services/index.js";
import { sendEmail } from "../utils/emailSender.js";
import { fullUrl } from "../utils/getUrl.js";
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

    //Send a whatsapp to the admin with the user information
    const userContent = 
    `
    <h1>New user</h1>
    <p>Time: ${req.user.timestamp.toISOString()}</p>
    <p>First Name: ${req.user.firstName}</p>
    <p>Last Name: ${req.user.lastName}</p>
    <p>Email: ${req.user.email}</p>
    <p>Phone: ${req.user.phone}</p>
    <p>Address: ${req.user.address}</p>
    <p>City: ${req.user.city}</p>
    <p>Age: ${req.user.age}</p>
    <p>Country: ${req.user.country}</p>
    <p>Image:</p>
    <img src="${fullUrl(req)}${req.user.photo}" alt="${req.user.firstName} ${req.user.lastName}">
    `
    
    
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
    res.status(500).send(err);
}