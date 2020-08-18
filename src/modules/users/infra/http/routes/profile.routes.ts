import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAutheticated from '@modules/users/infra/http/middlewares/ensureAutheticated';
import UsersProfileController from '../controllers/UsersProfileController';

const profileRouter = Router();

const usersProfileController = new UsersProfileController();

profileRouter.use(ensureAutheticated);

profileRouter.get('/', usersProfileController.show);
profileRouter.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      old_password: Joi.string(),
      password: Joi.string().when('old_password', {
        is: Joi.exist(),
        then: Joi.required(),
      }),
      password_confirmation: Joi.string().required().valid(Joi.ref('password')),
    },
  }),
  usersProfileController.update,
);

export default profileRouter;
