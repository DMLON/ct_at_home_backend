import express from "express";
import session from "express-session";
import MongoSession from "connect-mongodb-session";
import cookieParser from "cookie-parser";
import expressWs from "express-ws";

import { userServiceAuth } from "./services/index.js";
const passport = userServiceAuth.passport;
import config from "./config.js";
import { loggerDefault } from "./utils/loggers.js";
import morgan from "morgan";
import { GenericError, PageNotFoundError } from "./utils/genericError.js";
import { usersDao } from "./database/daos/index.js";



export const server = async () => {
    const { MONGODB_URI, SECRET, NODE_ENV, PORT, __dirname, SESSION_AGE_SECONDS } = config;
    const app = express();
    expressWs(app);
    
    app.use(morgan("combined"));

    const MongoStore = MongoSession(session);

    const store = new MongoStore({
        uri: MONGODB_URI,
        collection: "sessions",
    });

    const sessionMiddleware = session({
        store,
        resave: true,
        saveUninitialized: true,
        secret: SECRET,
        cookie: {
            maxAge: SESSION_AGE_SECONDS * 1000,
            sameSite: NODE_ENV == "development" ? "lax" : "strict",
        },
        rolling: true,
    });

    app.use(sessionMiddleware);
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser());
    app.use(passport.initialize()).use(passport.session());
    app.use(express.static(__dirname + "/public"));

    // Dynamic import, needs to be imported AFTER expressWS, needed to be able to use router.ws
    const { router_carts, router_products, router_users, router_upload, router_orders, router_config, router_messages } = await import(
        "./routers/index.js"
    );

    app.use("/api/products", router_products);
    app.use("/api/cart", router_carts);
    app.use("/api/auth", router_users);
    app.use("/api/config", router_config);
    app.use("/api/upload", router_upload);
    app.use("/api/orders", router_orders);
    app.use("/api/messages", router_messages);
    
    app.use("/login",async (req,res)=>{
        //Do a fake login on passport

        const user = await usersDao.getByEmail("user@mail.com")
        req.login(user,(err)=>{
            res.status(200).json({message:"Logged in"})
        });
        
    })
    
    app.use("*", (req, res) => {
        res.status(404).json(PageNotFoundError);
    });

    

    app.listen(PORT, () => {
        loggerDefault.info(`Server started on ${PORT}`);
    });
};
