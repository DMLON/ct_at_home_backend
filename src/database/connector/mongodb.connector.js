
import config from '../../config.js'
import DbClient from './dbClient.js';
import mongoose from 'mongoose';
import { loggerDefault } from '../../utils/loggers.js';
import { GenericError } from '../../utils/genericError.js';


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
            if(this.options) await this.client.connect(this.dbConnectionString,this.options)
            else await this.client.connect(this.dbConnectionString,options)
            loggerDefault.info('Mongo Database conectad')
            this.connected = true
        } catch (error) {
            throw new GenericError({status:500, message:'Error connecting to Mongo database: '+error.message})
        }
    }

    async disconnect() {
        try {
            await this.client.connection.close()
            loggerDefault.info('Mongo Database disconnected')
            this.connected = false
        } catch (error) {
            throw new GenericError({status:500, message:'Error connecting to Mongo database: '+error.message})
        }
    }
}


MongoInstance = new MongoClient(config.MONGODB_URI,{useNewUrlParser: true, useUnifiedTopology: true})
MongoInstance.connect().then(()=>{}).catch(err=>{loggerDefault.error(err.message)})

export default MongoInstance