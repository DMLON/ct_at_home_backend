import dotenv from "dotenv"
dotenv.config();

export const connectionString=`mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@${process.env.HOST}/${process.env.DATABASE}?retryWrites=true&w=majority`,
export const connectionStringTest=`mongodb://${process.env.USER}:${process.env.PASSWORD}@${process.env.HOST}/${process.env.DATABASE}_test?authSource=admin&readPreference=primary&directConnection=true&ssl=false`