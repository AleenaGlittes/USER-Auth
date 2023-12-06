import express from 'express';
const router = express.Router();
import { login } from '../controller/authcontroller.js';

router.post('/', login);

export default router;
