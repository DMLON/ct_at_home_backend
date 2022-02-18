import { Router } from 'express';
import { configController } from '../controllers/index.js';
import { isLogged, isUserAdmin } from '../middlewares/userValidator.js';

const router_config = Router();

router_config.get('/', isLogged,isUserAdmin,configController.getConfigs);

export default router_config;