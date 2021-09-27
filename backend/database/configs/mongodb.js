import dotenv from "dotenv"
dotenv.config();

module.exports = {
    connectionString:`mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@${process.env.HOST}/${process.env.DATABASE}?retryWrites=true&w=majority`,
    connectionStringTest:`mongodb://${process.env.USER}:${process.env.PASSWORD}@${process.env.HOST}/${process.env.DATABASE}_test`
}