import { ordersDao, usersDao } from "../database/daos";
import { GenericError } from "../utils/genericError";


export async function createOrder(userId) {
	try {
		const session = await ordersDao.startSession();
		let order = null;
		await session.withTransaction(async ()=>{
            const user = await usersDao.getByIdWithOrdersAndCart(userId);
			
			order = await ordersDao.create({products: user.cart.products, status: "pending", user: userId});
			user.orders.push(order.id)
			await usersDao.update(userId, user);
        })
        
        session.endSession();
		
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