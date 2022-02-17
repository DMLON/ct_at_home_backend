import { cartsDao, productsDao, usersDao } from "../database/daos/index.js";
import { cartModel } from "../models/cart.model.js";
import { productModel } from "../models/product.model.js";
import { GenericError } from "../utils/genericError.js";
import { loggerDefault, loggerErrors } from "../utils/loggers.js";
import { requestsService } from "./index.js";

export async function createCartForUser(user) {
    try {
        // Create cart
        const cart = await cartsDao.create();

        // Get user from DB and assign cart
        user.cart = cart.id;
        await usersDao.update(user.id, user);

        // Assign cart to user (Two way binding)
        cart.user = user.id;
        await cartsDao.update(cart.id, cart);

        loggerDefault.info(`Cart created for user ${user.id}`);
        return cart;
    } catch (error) {
        throw new GenericError(error);
    }
}

export async function getUserCart(user_id) {
    try {
        const cart = await cartsDao.getByUserId(user_id);
        return cart;
    } catch (error) {
        throw new GenericError(error);
    }
}

export async function getAllProducts(cartId) {
    try {
        const cart = await cartsDao.getCartByIdWithProducts(cartId);
        if (!cart) {
            throw new GenericError({ status: 404, message: "Cart not found" });
        }
        return cart.products;
    } catch (error) {
        throw new GenericError(error);
    }
}

export async function getCartPopulated(cartId) {
    try {
        const cart = await cartsDao.getCartByIdWithProducts(cartId);
        if (!cart) {
            throw new GenericError({ status: 404, message: "Cart not found" });
        }
        return cart;
    } catch (error) {
        throw new GenericError(error);
    }
}

export async function addProductToCart(cartId, productId, quantity) {
    try {
        let cart = null;
        try {
            cart = await cartsDao.getCartByIdWithProducts(cartId);
        } catch (error) {
            if (error.status === 404) throw new GenericError({ status: 404, message: "Cart not found" });
            else throw error;
        }
        let product = null;
        try {
            product = await productsDao.getById(productId);
        } catch (error) {
            if (error.status === 404) throw new GenericError({ status: 404, message: "Product not found" });
            else throw error;
        }

        if (product.stock < quantity) {
            throw new GenericError({ status: 400, message: "Not enough stock" });
        }
        if (quantity <= 0) {
            throw new GenericError({ status: 400, message: "Quantity must be greater than 0" });
        }

        const idx = cart.products.findIndex((prd) => prd.product.id == productId);

        if (idx != -1) {
            cart.products[idx].quantity = quantity;
        } else {
            cart.products.push({ quantity: quantity, product: product.id });
        }

        await cartsDao.update(cartId, cart);
        return true;
    } catch (error) {
        throw new GenericError(error);
    }
}

export async function deleteProductFromCart(cartId, productId) {
    try {
        let cart = null;
        try {
            cart = await cartsDao.getCartByIdWithProducts(cartId);
        } catch (error) {
            if (error.status === 404) throw new GenericError({ status: 404, message: "Cart not found" });
            else throw error;
        }

        const products = cart.products.filter((prd) => prd.product.id != productId);
        cart.products = products;
        await cartsDao.update(cartId, cart);
        return true;
    } catch (error) {
        throw new GenericError(error);
    }
}

export async function deleteCart(cartId,user_id) {
    try {
        const resp = await cartsDao.deleteById(cartId);
		// De ref user's cart
		const user = await usersDao.getById(user_id);
		user.cart = null;
		await usersDao.update(user.id, user);

        return resp;
    } catch (error) {
        throw new GenericError(error);
    }
}

export async function buyCart(cartId, userId) {
    try {
        let cart = null;
        try {
            cart = await cartsDao.getCartByIdWithProducts(cartId);
        } catch (error) {
            if (error.status === 404) throw new GenericError({ status: 404, message: "Cart not found" });
            else throw error;
        }

        const products = cart.products.map((prd) => {
            const product = prd.product;
            if (product.stock - prd.quantity > 0) product.stock = product.stock - prd.quantity;
            else throw new GenericError({ status: 400, message: "Not enough stock" });
            return product;
        });

        await Promise.all(products.map((prd) => prd.save()));

		// TODO: Fix create request. Add order to user. Delete cart if success
        await requestsService.createRequest(cartId, userId);

        // All good
        return true;
    } catch (error) {
        throw new GenericError(error);
    }
}
