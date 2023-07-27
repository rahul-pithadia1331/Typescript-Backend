import { Router } from 'express';
import controllers from '../controller/controller';

const router = Router();

router.post('/addData', controllers.addData);
router.get('/getData', controllers.getData);
router.patch('/updateData', controllers.updateData);
router.delete('/deleteData', controllers.deleteData);

export default router;
