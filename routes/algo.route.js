import Router from 'express';
import {
    getBalance,
    sendAlgo,
    getNFTs,
    mintNFT
} from '../controllers/algo.controller.js';

const algoR = Router();

algoR.get('/balance', getBalance);

algoR.post('/transaction', sendAlgo);

algoR.get('/nfts/:address', getNFTs);

algoR.get('/nfts/:address', mintNFT);


export default algoR;