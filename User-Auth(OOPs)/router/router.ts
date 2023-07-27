import { Router } from 'express';
import user from './../controller/user';


const router = Router();

router.use('/user', user)

export default router;
