import dotenv from "dotenv"

dotenv.config();
import express  from "express";
import session from "express-session";
import MongoSession from "connect-mongodb-session";
import cookieParser from "cookie-parser";
import flash from "connect-flash";
import router_cart from "./routers/cart.router.js";
import router_products from "./routers/products.router.js";
import router_users from "./routers/users.router.js";
import router_upload from "./routers/upload.router.js";
import {userServiceAuth} from "./services/index.js"
const passport = userServiceAuth.passport;
import "../database/mongo.js"
import cors from 'cors';
import path,{ dirname } from 'path';
import { fileURLToPath } from 'url';
import router_requests from "./routers/requests.router.js";

const __dirname = dirname(dirname(fileURLToPath(import.meta.url)));
//F:\backup\Coderhouse\Backend\ct_at_home\backend\public\build\index.html

export const  server = async ()=>{
    
    const { MONGODB_URI, SECRET, NODE_ENV } = process.env;
    const app = express();

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
            maxAge: 60 * 60 * 1000, // 5 seg
            sameSite: NODE_ENV == 'development' ? 'lax' : 'strict', 
        },
        rolling: true,
    });

    app.use(flash());
    app.use(sessionMiddleware);
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser());
    app.use(passport.initialize()).use(passport.session());
    app.use(express.static(__dirname + '/public'));

    app.use('/api/products',router_products)
    app.use('/api/cart',router_cart)
    app.use('/api/auth',router_users)
    app.use("/api/upload",router_upload)
    app.use("/api/requests",router_requests)
    app.get('*', function(req, res){
        res.sendFile("public/index.html",{ root: __dirname })
    });

    const PORT = process.env.PORT ? process.env.PORT : 8080;
    app.listen(PORT, () => {
        console.log(`Server started on ${PORT }`);
    });
}
