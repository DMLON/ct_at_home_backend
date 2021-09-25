import IDBConnector from './interface/iDBConnector';

class ContainerFirebase implements IDBConnector{
    db: any;
    constructor(){
        
        var admin = require("firebase-admin");

        var serviceAccount = require("./e-commerce-3d-firebase-adminsdk-qpzhi-7bb8f806a8.json");

        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount)
        });
        
        console.log("Firebase connected.");

        this.db = admin.firebase();
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


export default ContainerFirebase;