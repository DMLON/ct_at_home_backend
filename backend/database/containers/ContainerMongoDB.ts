import IDBConnector from './interface/iDBConnector';
import mongoose, { Mongoose } from 'mongoose';
class ContainerMongoDB implements IDBConnector{
    db: Mongoose;
    connectionString: string
    dbConnected: boolean;
    model: any
    constructor(connectionString:string,model){
        this.db = new Mongoose();
        this.connectionString = connectionString;
        this.dbConnected = false;
        this.model = model;
    }

    async connect(){
        try{
            await this.db.connect(this.connectionString)
            console.log("MongoDB connected");
            this.dbConnected = true;
        }
        catch(err){
            throw new Error(`Error connecting to mongo DB ${err}`);
        }
    }
    
    async createObject(object: any) {
        try{
            if(! this.dbConnected )
                await this.connect();
            const objectSave = new this.model(object);
            const res = await objectSave.save();
            console.log(res);
        }
        catch(err){
            throw new Error(`Error while creating object ${err}`);
        }
    }
    async updateObject(id,object: any) {
        try{
            if(! this.dbConnected )
                await this.connect();
            return await this.model.updateOne({id:id},{$set: {...object}});
        }
        catch(err){
            throw new Error(`Error while updating object ${err}`);
        }
    }
    async findById(id: any) {
        try{
            if(! this.dbConnected )
                await this.connect();
            return await this.model.find({id:id})
        }
        catch(err){
            throw new Error(`Error while getting object ${err}`);
        }
    }
    async getAll() {
        try{
            if(! this.dbConnected )
                await this.connect();
            return await this.model.find({})
        }
        catch(err){
            throw new Error(`Error while getting all objects ${err}`);
        }
    }
    async deleteById(id: any) {
        try{
            if(! this.dbConnected )
                await this.connect();
            return await this.model.deleteOne({id:id})
        }
        catch(err){
            throw new Error(`Error while deleting object ${err}`);
        }
    }
    async deleteAll() {
        try{
            if(! this.dbConnected )
                await this.connect();
            return await this.model.deleteMany({})
        }
        catch(err){
            throw new Error(`Error while deleting all objects ${err}`);
        }
    }

}

export default ContainerMongoDB;