import AppError from '@shared/errors/AppError';
import FakeNotificationsRepository from '@modules/notifications/repositories/fakes/FakeNotificationsRepository';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let createAppointmentService: CreateAppointmentService;
let fakeNotificationsRepository: FakeNotificationsRepository;

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    fakeNotificationsRepository = new FakeNotificationsRepository();
    createAppointmentService = new CreateAppointmentService(
      fakeAppointmentsRepository,
      fakeNotificationsRepository,
    );
  });

  it('should be able to create a new appointment', async () => {
    jest
      .spyOn(Date, 'now')
      .mockImplementationOnce(() => new Date(2020, 7, 20, 10).getTime());

    const appointmentDate = new Date(2020, 7, 20, 11);

    const appointment = await createAppointmentService.execute({
      date: appointmentDate,
      provider_id: 'provider_id',
      user_id: 'user_id',
    });

    await expect(appointment).toHaveProperty('id');
    await expect(appointment.provider_id).toBe('provider_id');
  });

  it('should not be able to create two appointment on the same time', async () => {
    jest
      .spyOn(Date, 'now')
      .mockImplementationOnce(() => new Date(2020, 7, 20, 10).getTime());

    const appointmentDate = new Date(2020, 7, 20, 11);

    await createAppointmentService.execute({
      date: appointmentDate,
      provider_id: 'provider_id',
      user_id: 'user_id',
    });

    await expect(
      createAppointmentService.execute({
        date: appointmentDate,
        provider_id: 'provider_id',
        user_id: 'user_id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointment on past date', async () => {
    jest
      .spyOn(Date, 'now')
      .mockImplementationOnce(() => new Date(2020, 7, 20, 10).getTime());

    const appointmentDate = new Date(2020, 7, 20, 9);

    await expect(
      createAppointmentService.execute({
        date: appointmentDate,
        provider_id: 'provider_id',
        user_id: 'user_id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointment with same user as provider', async () => {
    jest
      .spyOn(Date, 'now')
      .mockImplementationOnce(() => new Date(2020, 7, 20, 10).getTime());

    const appointmentDate = new Date(2020, 7, 20, 11);

    await expect(
      createAppointmentService.execute({
        date: appointmentDate,
        provider_id: 'user_id',
        user_id: 'user_id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointment ouside workhours', async () => {
    jest
      .spyOn(Date, 'now')
      .mockImplementationOnce(() => new Date(2020, 7, 19, 10).getTime());

    await expect(
      createAppointmentService.execute({
        date: new Date(2020, 7, 20, 7),
        provider_id: 'provider_id',
        user_id: 'user_id',
      }),
    ).rejects.toBeInstanceOf(AppError);

    await expect(
      createAppointmentService.execute({
        date: new Date(2020, 7, 20, 18),
        provider_id: 'provider_id',
        user_id: 'user_id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
