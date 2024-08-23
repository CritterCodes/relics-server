import Router from 'express';
import {
    getBalance,
    sendAlgo,
    getNFTs
} from '../controllers/algo.controller.js';

const algoR = Router();

algoR.get('/balance', getBalance);

algoR.post('/transaction', sendAlgo);

algoR.get('/nfts/:address', getNFTs);

export default algoR;