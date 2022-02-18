import {Router} from 'express';

import {userController} from "../controllers/index.js";
import {userServiceAuth} from "../services/index.js";
const passport = userServiceAuth.passport;

const router_users = Router();

// login
router_users.post('/login',passport.authenticate('login',{failWithError:true}),userController.loginSuccess,userController.loginError);

// Create new user with body info
router_users.post('/signup',passport.authenticate('signup',{failWithError:true}),userController.signupSuccess,userController.signupError);

// logout
router_users.post("/logout",userController.logout);


export default router_users;


