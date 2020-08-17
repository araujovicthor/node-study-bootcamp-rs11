import { Router } from 'express';
import ensureAutheticated from '@modules/users/infra/http/middlewares/ensureAutheticated';
import AppointmentsController from '../controllers/AppointmentsController';
import ProvidersAppointmentsController from '../controllers/ProvidersAppointmentsController';

const appointmentsRouter = Router();
const appointmentsController = new AppointmentsController();
const providersAppointmentsController = new ProvidersAppointmentsController();

appointmentsRouter.use(ensureAutheticated);

appointmentsRouter.post('/', appointmentsController.create);
appointmentsRouter.get('/me', providersAppointmentsController.index);

export default appointmentsRouter;
