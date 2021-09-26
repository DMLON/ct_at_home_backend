import admin, { firestore } from 'firebase-admin';
import credentials from './firebaseCredentials.js'
import IDBConnector from './interface/iDBConnector';
class ContainerFirebase implements IDBConnector{
    db: firestore.Firestore;
    collection: firestore.CollectionReference;
    constructor(collection: string){
        
        // const str = JSON.parse("./e-commerce-3d-firebase-adminsdk-qpzhi-7bb8f806a8.json");
        const cred: any = credentials.firebase;
        admin.initializeApp({
            credential: admin.credential.cert(cred)
        });
        
        console.log("Firebase connected.");

        this.db = admin.firestore();
        this.collection = this.db.collection(collection);
    }

    async createObject(object: any) {
        try{
            const doc = this.collection.doc();
            await doc.create(object);
            return doc.id;
        }
        catch(error){console.log("Error creating element " + error)}
        return null;
    }

    async updateObject(id: number | string, object: any) {
        try{
            const searchId = object.id ? object.id : id;
            const doc = this.collection.doc(`${searchId}`);
            const item = await doc.update({...object});
            return item;
        }
        catch(error){console.log("Error updating element " + error)}
        return null;
    }

    async findById(id: number | string) {
        try{
            const doc = this.collection.doc(`${id}`);
            const item = doc.get()
            const response = {id: id,...item};
            return response;
        }
        catch(error){console.log("Error getting element " + error)}
        return null;
    }

    async getAll() {
        try{
            const querySnapshot = await this.collection.get();
            const docs = querySnapshot.docs;

            const response = docs.map(doc=>({
                id: doc.id,
                ...doc.data()
            }));
            return response;
        }
        catch(error){console.log("Error getting all elements " + error)}
        return [];
    }
    async deleteById(id: number | string) {
        try{
            const doc = this.collection.doc(`${id}`);
            const item = await doc.delete();
            return true;
        }
        catch(error){console.log("Error getting all elements " + error)}
        return false;
    }

    async deleteAll() {
        try{
            const querySnapshot = await this.collection.get();
            const docs = querySnapshot.docs;
            const batch = this.db.batch();

            docs.forEach((docSnapshot,idx)=>{
                batch.delete(docSnapshot.ref);
            });

            await batch.commit();
            return true;
        }
        catch(error){console.log("Error deleting all elements " + error)}
        return false;
    }

}

export default ContainerFirebase;