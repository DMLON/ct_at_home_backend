import { requestsModel } from "../models/requests.model.js";

export async function createRequest(cart,user) {
	try {
		const exist = await requestsModel.findOne({ cart: cart._id }).and({ status: "pending" });
		if (exist) {
			throw new Error(`Request for cart ${cart._id} already exists and is pending`)
		}
		const response = await requestsModel.create({timestamp:new Date(), cart: cart._id, user: user._id, status: "pending"})
		return response
	} catch (error) {
		throw new Error(error)
	}
}

export async function cancelRequest(cart,user) {
	try {
		const exist = await requestsModel.findOne({ cart: cart._id }).and({ status: "pending" });
		if (exist) {
			exist.status = "canceled";
            await exist.save();
		}else{
            throw new Error(`Request for cart ${cart._id} does not exist`)
        }
	} catch (error) {
		throw new Error(error)
	}
}

export async function getRequestsFromUser(user) {
	try {
		const reqs = await requestsModel.find({ user: user._id })
		if (reqs) {
            return reqs
		}else{
            throw new Error(`User ${user._id} has no requests`)
        }
	} catch (error) {
		throw new Error(error)
	}
}


export async function getRequestsFromCart(cart) {
	try {
		const reqs = await requestsModel.find({ cart: cart._id })
		if (reqs) {
            return reqs
		}else{
            throw new Error(`Cart ${cart._id} has no requests`)
        }
	} catch (error) {
		throw new Error(error)
	}
}