import { Router } from 'express';

import ensureAutheticated from '@modules/users/infra/http/middlewares/ensureAutheticated';
import UsersProfileController from '../controllers/UsersProfileController';

const profileRouter = Router();

const usersProfileController = new UsersProfileController();

profileRouter.use(ensureAutheticated);

profileRouter.get('/', usersProfileController.show);
profileRouter.put('/', usersProfileController.update);

export default profileRouter;
