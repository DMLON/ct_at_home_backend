import { cartsDao, productsDao, usersDao } from "../database/daos/index.js";
import { GenericError } from "../utils/genericError.js";
import { loggerDefault, loggerErrors } from "../utils/loggers.js";
import { ordersService } from "./index.js";

export async function createCartForUser(userId) {
    try {

        // Start a transaction so it will rollback in case it does not work
        const session = await cartsDao.startSession();
        let cart = null;
        await session.withTransaction(async ()=>{
            // Create cart
            cart = await cartsDao.create();

            // Get user from DB and assign cart
            user.cart = cart.id;
            await usersDao.update(userId, user);

            // Assign cart to user (Two way binding)
            cart.user = userId;
            await cartsDao.update(cart.id, cart);
        })
        
        session.endSession();

        loggerDefault.info(`Cart created for user ${userId}`);
        return cart;
    } catch (error) {
        throw new GenericError(error);
    }
}

export async function getUserCart(userId) {
    try {
        const cart = await cartsDao.getByUserId(userId);
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

        // Check if cart already has product, if it has, update the quantity, else add it
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

export async function deleteCart(cartId,userId) {
    try {
        const resp = await cartsDao.deleteById(cartId);
		// De ref user's cart
		const user = await usersDao.getById(userId);
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
            if (product.stock - prd.quantity >= 0) product.stock = product.stock - prd.quantity;
            else throw new GenericError({ status: 400, message: "Not enough stock" });
            return product;
        });

        const session = await cartsDao.startSession();
        let order = null;
        await session.withTransaction(async ()=>{
            await Promise.all(products.map((prd) => prd.save()));

            // TODO: Fix create request. Add order to user. Delete cart if success
            order = await ordersService.createOrder(userId);

            // Delete cart from user
            const user = await usersDao.getById(userId);
            user.cart = null;
            await usersDao.update(user.id, user);

            // Delete cart
            await cartsDao.deleteById(cartId);
        })
        
        await session.endSession();
		

        // All good
        return order;
    } catch (error) {
        throw new GenericError(error);
    }
}
