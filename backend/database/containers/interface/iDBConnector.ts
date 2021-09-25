interface IDBConnector{
    createObject(object: any): any;
    updateObject(object: any): any;
    findById(id: number): any;
    getAll(): any;
    deleteById(id: number);
    deleteAll();
}

export default IDBConnector;