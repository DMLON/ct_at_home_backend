// const fs = require('fs');
import fs from 'fs';
import { IJSONParseable } from "../models/FileSystem/IJSONParseable";
import IDBConnector from './interface/iDBConnector';
class ContainerFileSystem<T extends IJSONParseable<T>> implements IDBConnector{
    filename: string;
    indentation:number;
    type;
    constructor(type: (new () => T), filename,indentation = 4){
        this.filename = filename;
        this.indentation = indentation;
        this.type = type;
    }

    async _getLastId(content:any=null){
        if (content == null){
            content = await this.getAll();
        }
        let lastId = 0
        if (content.length > 0){
            const ids = content.map(x=>x["id"]);
            lastId = Math.max(...ids);
        }
        return lastId;
    }

    // En caso que el objeto no tenga id, se lo creo, sino lo pisa el deconstruct
    async updateObject(id: number, object: T){
        this.createObject({id: id, ...object});
    }

    async createObject(object: T){
        try{
            const content = await this.getAll();
            const lastId = await this._getLastId(content);
            let update = false;
            let idx = lastId;
            // If has id, means it's an update
            if(object["id"] != undefined && object['id'] != -1){
                //update
                idx = content.findIndex(el=>el["id"]==object["id"]);
                content[idx] = object;
                update = true;
            }
            else{
                object['id'] = lastId + 1;
                content.push(object);
            }
            try{
                await fs.promises.writeFile(this.filename,JSON.stringify(content,null,this.indentation),"utf-8");
            }
            catch(error){
                throw `Error when writing to file: ${error}`;
            }
            
            if(update)
                return idx;
            else
                return lastId + 1;
        }
        catch(error){
            throw `Error while saving elements: ${error}`;
        }
    }

    async findById(id){
        try{
            const content = await this.getAll();
            const obj = content.filter(el => el["id"] == id);

            return obj.length == 0? null: obj[0];
        }
        catch(error){
            throw `Error while getting all elements: ${error}`;
        }
    }

    async getAll(){
        try{
            const content = await fs.promises.readFile(this.filename,'utf-8');
            try{
                
                const objets: Array<T> =  JSON.parse(content).map(t => {
                    return new this.type().deserialize(t); 
                });
                return objets;
            }
            catch(parseError){
                //En caso de que el archivo esté vacio agarro ese error y retorno simplemente un array vacio
                return [];
            }
        }
        catch(error){
            throw `Error while reading file: ${error}`;
        }
    }

    async deleteById(id){
        try{
            let content = await this.getAll();
            const idx = content.findIndex(el=>el["id"]==id);

            //En caso que de -1 es que no existe el item
            if (idx < 0){
                throw `Item with id ${id} not found`;
            }
            
            const contentWithoutElement = content.filter(el=>el["id"]!=id)

            try{
                await fs.promises.writeFile(this.filename,JSON.stringify(contentWithoutElement,null,this.indentation),"utf-8");
            }
            catch(error){
                throw `Error when writing to file: ${error}`;
            }
        }
        catch(error){
            throw `Error while getting all elements: ${error}`;
        }
    }

    async deleteAll(){
        try{
            await fs.promises.writeFile(this.filename,"[]","utf-8");
        }
        catch(error){
            throw `Error when writing to file: ${error}`;
        }
    }
}


export default ContainerFileSystem;