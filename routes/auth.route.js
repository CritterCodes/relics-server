import express from 'express';
import { authenticateUser } from '../controllers/auth.controller.js';

const authR = express.Router();

authR.post('', authenticateUser);

export default authR;
