
import IDBConnector from './interface/iDBConnector';
class ContainerMemory implements IDBConnector{
    objectsArray: Array<any>;

    constructor(){
        this.objectsArray = [];
    }
    createObject(object: any) {
        
    }
    updateObject(object: any) {

    }
    findById(id: number) {

    }
    getAll() {

    }
    deleteById(id: number) {

    }
    deleteAll() {

    }

}

export default ContainerMemory;