import { Router } from 'express';
import { fileUploadSuccess } from '../controllers/upload.controller.js';
import { upload } from '../utils/multer.utils.js';


const router_upload = Router();

router_upload.post('/', upload.single('file'),fileUploadSuccess);

export default router_upload