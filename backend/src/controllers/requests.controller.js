import { requestsModel } from "../models/requests.model.js";
import { getAllRequests, getRequestsFromUser } from "../services/orders.services.mongo.js";
import { loggerDefault, loggerErrors } from "../utils/loggers.js";

export const getRequests = async (req, res) => {
    try {
        if(!req.params.id){
            const requests = await getAllRequests();
            res.status(200).send(requests);
        }
        else{
            // Sino devuelvo especifico
            const requests = await getRequestsFromUser(req.params.id);
            res.status(200).send(requests);
        }

    } catch (error) {
        loggerErrors.error( "Error getting requests " +error);
        res.status(500).json({error:true,
            status: "Error getting requests",
            error: error.message
        }); 
    }
}

export const getRequestsUser = async (req, res) => {
    
    try{
        if (!req.user){
            throw new Error("User not logged in");
        }
        const { _id } = req.user;
        const order = await requestsModel.find({ user: _id });
        res.json(order);
    }
    catch(err){
        loggerErrors.error( "Error getting requests " +err);
        res.status(500).json({error:true,
            status: "Error getting requests",
            error: err.message
        });
    }

}

// Change status from a request from pending to accepted
export const acceptRequest = async (req, res) => {
    try{
        if (!req.user){
            throw new Error("User not logged in");
        }
        if(!req.user.isAdmin){
            throw new Error("User is not admin");
        }
        const { id } = req.params;
        const order = await requestsModel.findById(id);
        order.status = "accepted";
        await order.save();
        res.json(order);
    }
    catch(err){
        loggerErrors.error( "Error getting requests " +err);
        res.status(500).json({error:true,
            status: "Error getting requests",
            error: err.message
        });
    }
    
}

// Change status from a request from pending to rejected
export const rejectRequest = async (req, res) => {
    try{
        if (!req.user){
            throw new Error("User not logged in");
        }
        if(!req.user.isAdmin){
            throw new Error("User is not admin");
        }
        const { id } = req.params;
        const order = await requestsModel.findById(id);
        order.status = "rejected";
        await order.save();
        res.json(order);
    }
    catch(err){
        loggerErrors.error( "Error getting requests " +err);
        res.status(500).json({error:true,
            status: "Error getting requests",
            error: err.message
        });
    }
    
}

// Change status from a request from pending to completed
export const completeRequest = async (req, res) => {
    try{
        if (!req.user){
            throw new Error("User not logged in");
        }
        if(!req.user.isAdmin){
            throw new Error("User is not admin");
        }
        const { id } = req.params;
        const order = await requestsModel.findById(id);
        order.status = "completed";
        await order.save();
        res.json(order);
    }
    catch(err){
        loggerErrors.error( "Error getting requests " +err);
        res.status(500).json({error:true,
            status: "Error getting requests",
            error: err.message
        });
    }
}
export const cancelRequest = async (req, res) => {


    try {
        if (!req.user){
            throw new Error("User not logged in");
        }
        if(!req.user.isAdmin){
            throw new Error("User is not admin");
        }
        const exist = await requestsModel.findById(id);
        if (exist) {
            exist.status = "canceled";
            await exist.save();
        }else{
            throw new Error(`Request ${id} does not exist`)
        }
    } catch (error) {
        loggerErrors.error( "Error getting requests " +err);
        res.status(500).json({error:true,
            status: "Error getting requests",
            error: err.message
        });
    }
}