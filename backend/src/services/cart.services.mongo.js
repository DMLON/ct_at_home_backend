import { cartModel } from "../models/cart.model.js"
import { productModel } from "../models/product.model.js"

export async function createCart() {
	try {
		const response = await cartModel.create({timestamp: new Date()})
		return response
	} catch (error) {
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
	} catch (error) {
		throw new Error(error)
	}
}

export async function addProductToCart(cartId,productId,quantity) {
	try {
		const cart = await cartModel.findById(cartId).populate('products.product');
		if (!cart) {
			throw new Error('Cart not found');
		}
		const product = await productModel.findById(productId);
		if (!product) {
			throw new Error('Product not found');
		}
		if(product.stock < quantity){
			throw new Error('Product quanitty is superior to stock');
		}
		if(quantity <= 0){
			throw new Error('Quantity must be higher than 0 and lower than stock');
		}

		const idx = cart.products.findIndex(prd=> prd.product.id == productId);

		if(idx != -1){
			cart.products[idx].quantity = quantity
		}
		else{
			cart.products.push({quantity:quantity,product:product.id});
		}
		
		
		const success = await cart.save();
		if (!success) {
			throw new Error('Could not add product to cart');
		}
		return success;
	} catch (error) {
		throw new Error(error)
	}
}

export async function deleteProductFromCart(cartId,productId){
    try {
		const cart = await cartModel.findById(cartId).populate('products.product');
		if (!cart) {
			throw new Error('Cart not found');
		}
		const products = cart.products.filter(prd=>prd.product.id != productId);
		cart.products = products;
		const success = await cart.save();
		if (!success) {
			throw new Error('Could not save cart');
		}
	} catch (error) {
		throw new Error(error)
	}
}

export async function deleteCart(cartId){
    try {
		const resp = await cartModel.findByIdAndDelete(cartId);
		return resp;
	} catch (error) {
		throw new Error(error)
	}
}
