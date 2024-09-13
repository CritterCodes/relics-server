import { Router } from 'express';
import SubsController from '../controllers/subs.controller.js'

export default subsRoute = Router();

subsRoute.post('/', SubsController.addSub);
subsRoute.get('/', SubsController.getSubs);
subsRoute.get('/:subID', SubsController.getSub);
subsRoute.delete('/:subID', SubsController.deleteSub);