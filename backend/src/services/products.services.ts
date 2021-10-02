import { productModel } from "../models/product.model";

export async function createProduct(data) {
	try {
		const response = await productModel.create(data)
		return response
	} catch (error:any) {
		throw new Error(error)
	}
}

export async function getProduct(code) {
	try {
		const product = await productModel.find({ code })
		if (!product) {
			throw new Error('Product not found')
		}
		return product
	} catch (error:any) {
		throw new Error(error)
	}
}

export async function getAllProducts() {
	try {
		const products = await productModel.find({});
		return products;
	} catch (error:any) {
		throw new Error(error)
	}
}

export async function deleteProduct(code){
    try {
		const res = await productModel.deleteOne({code});
		return res;
	} catch (error:any) {
		throw new Error(error)
	}
}

export async function updateProduct(code,data){
    try {
		const product = await productModel.updateOne({code},{$set:{...data}});
		return product;
	} catch (error:any) {
		throw new Error(error)
	}
}