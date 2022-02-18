import express from "express";
import session from "express-session";
import MongoSession from "connect-mongodb-session";
import cookieParser from "cookie-parser";
// import {router_cart, router_products, router_users, router_upload, router_orders, router_messages} from "./routers/index.js"
import { userServiceAuth } from "./services/index.js";
const passport = userServiceAuth.passport;
import config from "./config.js";
import { loggerDefault } from "./utils/loggers.js";
import morgan from "morgan";

import router_products from "./routers/products.router.js";
import router_users from "./routers/users.router.js";
import router_carts from "./routers/carts.router.js";
import router_config from "./routers/config.router.js";

import { GenericError, PageNotFoundError } from "./utils/genericError.js";

export const server = async () => {
    const { MONGODB_URI, SECRET, NODE_ENV, PORT, __dirname, SESSION_AGE_SECONDS } = config;
    const app = express();
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

    app.use("/api/products", router_products);
    app.use('/api/cart',router_carts)
    app.use("/api/auth", router_users);
    app.use("/api/config", router_config);
    // app.use("/api/upload",router_upload)
    // app.use("/api/orders",router_orders)
    // app.use("/api/messages",router_messages)
    app.use("*", (req, res) => {
        res.status(404).json(PageNotFoundError);
    });

    app.listen(PORT, () => {
        loggerDefault.info(`Server started on ${PORT}`);
    });
};
