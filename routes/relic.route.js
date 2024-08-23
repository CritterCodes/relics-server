import express from 'express';
import {
    getRelic,
    listRelics,
    createRelic,
    updateRelic,
    deleteRelic
} from '../controllers/relic.controller.js';

const relicR = express.Router();

relicR.get('', listRelics);

relicR.post('', createRelic);

relicR.get('/:relicID', getRelic);

relicR.patch('/:relicID', updateRelic);

relicR.delete('/:relicID', deleteRelic);

export default relicR;