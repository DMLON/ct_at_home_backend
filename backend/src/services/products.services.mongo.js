import { productModel } from "../models/product.model.js";

export async function createProduct(data) {
	try {
		const exist = await productModel.findOne({ code: data.code })
		if (exist) {
			throw new Error(`Product ${data.code} already exists`)
		}
		const response = await productModel.create({timestamp:new Date(), ...data})
		return response
	} catch (error) {
		throw new Error(error)
	}
}

export async function getProduct(productId) {
	try {
		const product = await productModel.findById(productId)
		if (!product) {
			throw new Error('Product not found')
		}
		return product
	} catch (error) {
		throw new Error(error)
	}
}

export async function getAllProducts() {
	try {
		const products = await productModel.find({});
		return products;
	} catch (error) {
		throw new Error(error)
	}
}

export async function deleteProduct(productId){
    try {
		const exist = await productModel.findById(productId)
		if (!exist) {
			throw new Error(`Product ${productId} does not exist`)
		}
		const res = await productModel.deleteOne({code:exist.code});
		return res;
	} catch (error) {
		throw new Error(error)
	}
}

export async function updateProduct(productId,data){
    try {
		const exist = await productModel.findById(productId)
		if (!exist) {
			throw new Error(`Product ${data.code} does not exist`)
		}
		const product = await productModel.updateOne({code:exist.code},{$set:{...data}});
		return product;
	} catch (error) {
		throw new Error(error)
	}
}