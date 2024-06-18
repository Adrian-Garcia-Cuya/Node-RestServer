import { Router } from 'express';
import { check } from 'express-validator';

import { validateFields } from '../middlewares/validate-fields.js';
import { uploadFile } from '../controllers/uploads.js';


const router = Router();

router.post('/', uploadFile);


export { router };