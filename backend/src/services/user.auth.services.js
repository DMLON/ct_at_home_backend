import { userModel } from "../models/users.model.js";

import passport from "passport";
import {Strategy as LocalStrategy} from "passport-local";
import bcrypt from 'bcryptjs';

import {loggerWarnings,loggerErrors ,loggerDefault } from '../utils/loggers.js';

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
    async (username, password, done) => {
        userModel.findOne({ email:username }, (err, user) => {
            if (err) return done(err);

            if (!user) {
                loggerErrors.error("User not found with username " + username);
                return done(null, false);
            }

            if (!isValidPassword(user, password)) {
                loggerErrors.error("Invalid Password");
                return done(null, false);
            }

            return done(null, user);
        });
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
            userModel.findOne({ email: email }, function (err, user) {
                if (err) {
                    loggerErrors.error("Error in SignUp: " + err);
                    return done(err);
                }

                if (user) {
                    loggerErrors.error("User already exists");
                    return done({error:true,status:"User already exists"}, false);
                }

                const newUser = {
					timestamp: new Date(),
					email: email,
					country: req.body.country,
					password: createHash(password),
					firstName: req.body.firstName,
					lastName: req.body.lastName,
					phone: req.body.phone,
					address: req.body.address,
					photo: req.body.photo,
					age: req.body.age,
                    isAdmin: false // Siempre es falso a menos que se cambie a mano en la db
                };

                userModel.create(newUser, (err, userWithId) => {
                    if (err) {
                        loggerErrors.error("Error in Saving user: " + err);
                        return done(err);
                    }
                    loggerDefault.info("User Registration succesful");
                    return done(null, userWithId);
                });
            });
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
    done(null, user._id);
});

passport.deserializeUser((id, done) => {
    userModel.findById(id, done);
});

export { passport };


