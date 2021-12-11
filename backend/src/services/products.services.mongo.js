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

export async function getProduct(code) {
	try {
		const product = await productModel.find({ code })
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

export async function deleteProduct(code){
    try {
		const exist = await productModel.findOne({ code: code })
		if (!exist) {
			throw new Error(`Product ${code} does not exist`)
		}
		const res = await productModel.deleteOne({code});
		return res;
	} catch (error) {
		throw new Error(error)
	}
}

export async function updateProduct(code,data){
    try {
		const exist = await productModel.findOne({ code: data.code })
		if (!exist) {
			throw new Error(`Product ${data.code} does not exist`)
		}
		const product = await productModel.updateOne({code},{$set:{...data}});
		return product;
	} catch (error) {
		throw new Error(error)
	}
}