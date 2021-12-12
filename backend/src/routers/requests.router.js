import {Router} from 'express';
import validateUser from '../middlewares/userValidator.js';
import {requestsController} from "../controllers/index.js"

const router_requests = Router();

// Get all requests or one by id
router_requests.get('/:id?' , validateUser, requestsController.getRequests);


export default router_requests;