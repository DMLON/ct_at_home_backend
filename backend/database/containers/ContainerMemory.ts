
import IDBConnector from './interface/iDBConnector';
class ContainerMemory implements IDBConnector{
    objectsArray: Array<any>;
    lastId: number;
    constructor(){
        this.objectsArray = [];
        this.lastId = 1;
    }
    createObject(object: any) {
        const newObject = {id: this.lastId, ...object};
        this.lastId += 1;
        this.objectsArray.push(newObject);
        return this.lastId - 1;
    }

    updateObject(id: number | string , object: any) {
        const idx = this.objectsArray.map(x=>x.id).indexOf(id);
        if (idx == -1){
            //Not found
            return false;
        }
        else{
            this.objectsArray[idx] = {...this.objectsArray[idx], ...object};
        }
        return true;

    }
    findById(id: number) {
        const res = this.objectsArray.filter(x=>x.id == id);
        if (res.length == 0){
            //Not found
            return null;
        }
        else{
            return res[0];
        }
    }
    getAll() {
        return this.objectsArray;
    }
    deleteById(id: number) {
        const res = this.objectsArray.filter(x=>x.id != id);
        this.objectsArray = res;
    }
    deleteAll() {
        this.objectsArray = [];
    }

}

export default ContainerMemory;