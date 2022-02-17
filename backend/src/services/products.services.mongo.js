import { productsDao } from "../database/daos/index.js";
import { GenericError } from "../utils/genericError.js";

export async function createProduct(data) {
    try {
        const exist = await productsDao.getByCode({ code: data.code });
        if (exist) {
            throw new GenericError({status:409 ,message:`Product ${data.code} already exists`});
        }
        const response = await productsDao.create(data);
        return response;
    } catch (error) {
        throw new GenericError(error);
    }
}

export async function getProduct(productId) {
    try {
        const product = await productsDao.getById(productId);
        return product;
    } catch (error) {
        if (error.status == 404) {
            throw new GenericError({ status: 404, message: `Product Not found with id: ${productId}` });
        } else {
            throw new GenericError(error);
        }
    }
}

export async function getAllProducts() {
    try {
        const products = await productsDao.getAll();
        return products;
    } catch (error) {
        throw new GenericError(error);
    }
}

export async function deleteProduct(productId) {
    try {
        const res = await productsDao.deleteById(productId);
        return res;
    } catch (error) {
        if (error.status == 404) {
            throw new GenericError({ status: 404, message: `Product Not found with id: ${productId}` });
        } else {
            throw new GenericError(error);
        }
    }
}

export async function updateProduct(productId, data) {
    try {
        const product = await productsDao.update(productId, data);
        return product;
    } catch (error) {
        if (error.status == 404) {
            throw new GenericError({ status: 404, message: `Product Not found with id: ${productId}` });
        } else {
            throw new GenericError(error);
        }
    }
}
