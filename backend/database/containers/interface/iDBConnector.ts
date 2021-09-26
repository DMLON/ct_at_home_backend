interface IDBConnector{
    createObject(object: any): any;
    updateObject(id: number, object: any): any;
    findById(id: number): any;
    getAll(): any;
    deleteById(id: number);
    deleteAll();
}

export default IDBConnector;