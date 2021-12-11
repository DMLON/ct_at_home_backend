import { getFirestore } from "../../database/firebase";

export async function createProduct(data) {
	try{
		const collection = getFirestore().collection("products");

		// Check if exists
		const query = collection.where('code','==',data.code);
		const result = await query.get();

		if (result.size != 0) {
			throw new Error('Product already exists');
		}

		// Else create new
		const doc = collection.doc();
		await doc.create({timestamp: new Date(), ...data});
		return doc;
	}
	catch(error){throw new Error("Error creating element " + error)}
}

export async function getProduct(code) {
	try{
		const collection = getFirestore().collection("products");

		// Check if exists
		const query = collection.where('code','==',code);
		const result = await query.get();

		if (result.size == 0) {
			throw new Error('Product not found');
		}
		return result.docs[0].data();
	}
	catch(error){throw new Error("Error getting product " + error)}
}

export async function getAllProducts() {
	try{
		const collection = getFirestore().collection("products");
		const querySnapshot = await collection.get();
		const docs = querySnapshot.docs;

		const response = docs.map(doc=>({
			id: doc.id,
			...doc.data()
		}));
		return response;
	}
	catch(error){throw new Error("Error getting all elements " + error)}
}

export async function deleteProduct(code){
	try{
		const collection = getFirestore().collection("products");

		// Check if exists
		const query = collection.where('code','==',code);
		const result = await query.get();

		if (result.size == 0) {
			throw new Error('Product not found');
		}
		const product = result.docs[0]

		const res = await product.ref.delete();
		return res;
	}
	catch(error){console.log("Error getting all elements " + error)}
	return false;
}

export async function updateProduct(code,data){
	try{
		const collection = getFirestore().collection("products");

		// Check if exists
		const query = collection.where('code','==',code);
		const result = await query.get();

		if (result.size == 0) {
			throw new Error('Product not found');
		}
		const product = result.docs[0]

		const res = await product.ref.update({...data});
		return res;
	}
	catch(error){throw new Error("Error updating element " + error)}
}