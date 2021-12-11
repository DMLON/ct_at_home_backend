import {Router} from 'express';

import {userController} from "../controllers/index.js";
import {userServiceAuth} from "../services/index.js";
const passport = userServiceAuth.passport;

const router_user = Router();

// login
router_user.post('/login',passport.authenticate('login',{failWithError:true}),userController.loginSuccess,userController.loginError);

// Create new user with body info
router_user.post('/signup',passport.authenticate('signup',{failWithError:true}),userController.signupSuccess,userController.signupError);

// logout
router_user.post("/logout",userController.logout);


export default router_user;


