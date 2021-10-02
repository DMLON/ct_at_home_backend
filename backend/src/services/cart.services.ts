import { getFirestore } from "../../database/firebase"


export async function createCart() {
	try{
		const collection = getFirestore().collection("carts");
		const doc = collection.doc();
		await doc.create({timestamp: new Date(), products: []});
		return doc.id;
	}
	catch(error){console.log("Error creating element " + error)}
	return null;
	
}

export async function getAllProducts(cartId) {
	try{
		const collection = getFirestore().collection("carts");
		const doc = collection.doc(`${cartId}`);
		const item = await doc.get()
		const response = {id:cartId,...item.data()};
		return response;
	}
	catch(error){console.log("Error getting element " + error)}
	return null;
}

export async function addProductToCart(cartId,productCode,quantity) {
	try {
		const collection_cart = getFirestore().collection("carts");
		const doc = collection_cart.doc(`${cartId}`);
        const cartQuery = await doc.get();
		const cart = cartQuery.data();
		if (!cart) {
			throw new Error('Cart not found');
		}
		const collection_products = getFirestore().collection("products");
		const query = collection_products.where('code','==',productCode);
		const result = await query.get();

		if (result.size == 0) {
			throw new Error('Product not found');
		}
		const product = result.docs[0].data();

		if(product.stock < quantity){
			throw new Error('Product quanitty is superior to stock');
		}
		if(quantity <= 0){
			throw new Error('Quantity must be higher than 0 and lower than stock');
		}
		const idx = cart.products.findIndex(prd=>prd.product.code == productCode);

		if(idx != -1){
			cart.products[idx].quantity = quantity
		}
		else{
			//Deberia eliminar el product quanity, sin esto igual no podria darle el atributo a la relación correctamente en el modelo de esquemas de moongoose
			cart.products = [...cart.products, {product:product,quantity:quantity}];
		}
		
		
		const success = await doc.update({...cart})
		if (!success) {
			throw new Error('Could not add product to cart');
		}
		return success;
	} catch (error:any) {
		throw new Error(error)
	}
}

export async function deleteProductFromCart(cartId,productCode){
    try {
		const collection_cart = getFirestore().collection("carts");
		const doc = collection_cart.doc(`${cartId}`);
        const cartQuery = await doc.get();
		const cart = cartQuery.data();
		if (!cart) {
			throw new Error('Cart not found');
		}

		const products = cart.products.filter(prd=>prd.product.code != productCode);
		cart.products = products;
		const success = await doc.update({...cart})
		if (!success) {
			throw new Error('Could not delete product from cart');
		}
	} catch (error:any) {
		throw new Error(error)
	}
}

export async function deleteCart(cartId){
    try{
		const collection_cart = getFirestore().collection("carts");
		const doc = collection_cart.doc(`${cartId}`);
		const item = await doc.delete();
		return true;
	}
	catch(error){console.log("Error deleting cart" + error)}
	return false;
}
