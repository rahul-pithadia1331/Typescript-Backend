import { Router } from 'express';
import controllers from './lib/controller';

const router = Router();

router.post('/registration', controllers.registration);
router.post('/signin', controllers.signIn);

router.patch('/edit-profile', controllers.editProfile);
router.patch('/change-password', controllers.changePassword);

export default router;
