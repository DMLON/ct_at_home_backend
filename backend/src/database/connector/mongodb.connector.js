
import config from '../../config'
import DbClient from './dbClient';
import mongoose from 'mongoose';
import { loggerDefault } from '../../utils/loggers';

let MongoInstance = null;
class MongoClient extends DbClient {
    constructor(dbConnectionString,options) {
        super()
        this.connected = false
        this.client = mongoose
        this.dbConnectionString = dbConnectionString
        this.options = options
    }

    async connect() {
        try {
            if(this.options) await this.client.connect(this.dbConnectionString,options)
            else await this.client.connect(this.dbConnectionString,options)
            loggerDefault.info('Mongo Database conectad')
            this.connected = true
        } catch (error) {
            throw new Error({status:500, message:'Error connecting to Mongo database: '+error})
        }
    }

    async disconnect() {
        try {
            await this.client.connection.close()
            loggerDefault.info('Mongo Database disconnected')
            this.connected = false
        } catch (error) {
            throw new Error({status:500, message:'Error connecting to Mongo database: '+error})
        }
    }
}


MongoInstance = new MongoClient(config.MONGODB_URI,{useNewUrlParser: true, useUnifiedTopology: true})
MongoInstance.connect()

export default MongoInstance