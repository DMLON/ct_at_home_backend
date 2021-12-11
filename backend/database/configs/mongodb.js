import dotenv from "dotenv"
dotenv.config();

export const connectionString=process.env.MONGODB_URI;
export const connectionStringTest=`mongodb://${process.env.USER}:${process.env.PASSWORD}@${process.env.HOST}/${process.env.DATABASE}_test?authSource=ecommerce&readPreference=primary&directConnection=true&ssl=false`