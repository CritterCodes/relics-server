import express from 'express';
import {
    createCollector,
    getCollector,
    listCollectors,
    updateCollector,
    deleteCollector,
    getCollectorByUsername
} from '../controllers/collectors.controller.js';

const collectorR = express.Router();

//  api/efd/v1/collectors

collectorR.get('', listCollectors);
collectorR.post('', createCollector);
collectorR.get('/:address', getCollector);
collectorR.get('/profile/:username', getCollectorByUsername);
collectorR.patch('/:address', updateCollector);
collectorR.delete('/:address', deleteCollector);

export default collectorR;
