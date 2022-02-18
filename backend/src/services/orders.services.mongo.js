import { ordersDao, usersDao } from "../database/daos/index.js";
import { ProductDTO } from "../database/dtos/product.dto.js";
import { GenericError } from "../utils/genericError.js";


export async function createOrder(userId) {
	try {
		const session = await ordersDao.startSession();
		let order = null;
		await session.withTransaction(async ()=>{
            const user = await usersDao.getByIdWithOrdersAndCart(userId);
			const products = user.cart.products.map(product=>{ return { product: new ProductDTO(product.product), quantity: product.quantity }}); 
			order = await ordersDao.create({products: products, status: "pending", user: userId});
			user.orders.push(order.id)
			await usersDao.update(userId, user);
        })
        
        await session.endSession();
		
		return order
	} catch (error) {
		throw new GenericError(error)
	}
}

export async function changeOrderStatus(orderId,status){
	try {
		const order = await ordersDao.getById(orderId);

		order.status = status;
		return await ordersDao.update(orderId, order);
	} catch (error) {
		throw new GenericError(error)
	}
}

// User function
export async function getOrdersFromUser(userId) {
	try {
		const reqs = await usersDao.getByIdWithOrders(userid);
		if (reqs) {
            return reqs
		}else{
            throw new GenericError({status:404,messages:`User ${userId} has no orders`})
        }
	} catch (error) {
		throw new GenericError(error)
	}
}

// Admin function
export async function getAllOrdersWithUsers() {
	try {
		const reqs = await ordersDao.getAllWithUsers();
		if (reqs) {
			return reqs
		}else{
			throw new GenericError({status:404,messages:`No Orders`})
		}
	} catch (error) {
		throw new GenericError(error)
	}
}