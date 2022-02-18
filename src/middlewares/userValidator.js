import { GenericError } from "../utils/genericError.js";

export async function isUserAdmin(req, res, next) {
    try {
        if (!req.user) {
            throw new GenericError({ status: 401, message: "User is not admin!" });
        }
        try {
            if (req.user.isAdmin == true) {
                next();
            } else {
                throw new GenericError({ status: 401, message: "User is not admin!" });
            }
        } catch (error) {
            throw new GenericError({ status: 401, message: "User is not admin!" });
        }
    } catch (error) {
        res.status(401).json(error);
    }
}

export async function isLogged(req, res, next) {
    try {
        if (!req.user) {
            throw new GenericError({ status: 401, message: "User is not logged!" });
        } else {
            next();
        }
    } catch (error) {
        res.status(401).json(error);
    }
}


