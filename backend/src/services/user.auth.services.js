
import passport from "passport";
import {Strategy as LocalStrategy} from "passport-local";
import bcrypt from 'bcryptjs';

import {loggerWarnings,loggerErrors ,loggerDefault } from '../utils/loggers.js';
import {usersDao} from "../database/daos";

function isValidPassword(user, password) {
    return bcrypt.compareSync(password, user.password);
}
// Busco si el usuario existe
passport.use(
    "login",
    new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true,
        },
    async (req,email, password, done) => {

        try{
            const user = await usersDao.getByEmail(email);
            if (!user) {
                throw {status:"error",message:"User not found with email " + email}
            }
            if (!isValidPassword(user, password)) {
                throw {status:"error",message:"Invalid Password"}
            }
            return done(null, user);
        }catch(error){
            loggerErrors.error(error);
            return done(error);
        }
    })
);

passport.use(
    "signup",
    new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true,
        },
        async (req, email, password, done) => {

            try{
                const user = await usersDao.getByEmail(email);
                if (user) {
                    throw {status:"error",message:"User already exists"}
                }
                const newUser = {
                    email: email,
                    country: req.body.country,
                    password: createHash(password),
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    phone: req.body.phone,
                    address: req.body.address,
                    photo: req.body.photo,
                    age: req.body.age,
                    isAdmin: false, // Siempre es falso a menos que se cambie a mano en la db
                    cart:null,
                    orders:[]
                };

                const userWithId = await usersDao.create(newUser)
                    
                loggerDefault.info("User Registration succesful");
                return done(null, userWithId);
                
            }catch(error){
                loggerErrors.error(error);
                return done(error);
            }
        }
    )
);

function createHash(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
}


// Para restaurar el estado de autenticación a través de solicitudes HTTP, Passport necesita serializar usuarios y deserializarlos fuera de la sesión.
// Esto se hace de modo que cada solicitud subsiguiente no contenga las credenciales del usuario anterior.
// Se suele implementar proporcionando el ID de usuario al serializar y consultando el registro de usuario por ID de la base de datos al deserializar.

passport.serializeUser((user, done) => {
    done(null, user.id);
});


passport.deserializeUser((id, done) => {
    usersDao.getById(id).then(user => {done(null,user)});
});

export { passport };


