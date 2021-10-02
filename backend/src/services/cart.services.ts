import { cartModel } from "../models/cart.model"
import { productModel } from "../models/product.model"
import { ProductQuantity, productQuantityModel } from "../models/ProductQuantity.model"

export async function createCart() {
	try {
		const response = await cartModel.create({timestamp: new Date()})
		return response
	} catch (error:any) {
		throw new Error(error)
	}
}

export async function getAllProducts(cartId) {
	try {
		const cart = await cartModel.findById(cartId );
		if (!cart) {
			throw new Error('Cart not found');
		}
		return cart.products;
	} catch (error:any) {
		throw new Error(error)
	}
}

export async function addProductToCart(cartId,productCode,quantity) {
	try {
		const cart = await cartModel.findById(cartId);
		if (!cart) {
			throw new Error('Cart not found');
		}
		const product = await productModel.findOne({code:productCode});
		if (!product) {
			throw new Error('Product not found');
		}
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
			const productQuantity = await productQuantityModel.create({product:product,quantity:quantity});
			cart.products = [...cart.products, productQuantity];
		}
		
		
		const success = await cart.save();
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
		const cart = await cartModel.findById(cartId);
		if (!cart) {
			throw new Error('Cart not found');
		}
		const products = cart.products.filter(prd=>prd.product.code != productCode);
		cart.products = products;
		const success = await cart.save();
		if (!success) {
			throw new Error('Could not save cart');
		}
	} catch (error:any) {
		throw new Error(error)
	}
}

export async function deleteCart(cartId){
    try {
		const resp = await cartModel.findByIdAndDelete(cartId);
		return resp;
	} catch (error:any) {
		throw new Error(error)
	}
}
