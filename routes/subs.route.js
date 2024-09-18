import { Router } from 'express';
import SubsController from '../controllers/subs.controller.js'

const subsRouter = Router();

subsRouter.post('/', SubsController.addSub);
subsRouter.get('/', SubsController.getSubs);
subsRouter.get('/:subID', SubsController.getSub);
subsRouter.delete('/:subID', SubsController.deleteSub);

export default subsRouter;