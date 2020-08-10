import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';

import ensureAutheticated from '@modules/users/infra/http/middlewares/ensureAutheticated';
import UsersController from '../controllers/UsersController';
import UsersAvatarController from '../controllers/UsersAvatarController';

const usersRouter = Router();

const upload = multer(uploadConfig);
const usersController = new UsersController();
const usersAvatarController = new UsersAvatarController();

usersRouter.post('/', usersController.create);

usersRouter.patch(
  '/avatar',
  ensureAutheticated,
  upload.single('avatar'),
  usersAvatarController.update,
);

export default usersRouter;
