import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import ListProviderAppointmentsService from './ListProviderAppointmentsService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderAppointments: ListProviderAppointmentsService;

describe('ListProviderAppointments', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProviderAppointments = new ListProviderAppointmentsService(
      fakeAppointmentsRepository,
    );
  });

  it('should be able to list the appointments for a specific day', async () => {
    const appointment1 = await fakeAppointmentsRepository.create({
      provider_id: 'provider_id',
      date: new Date(2020, 7, 20, 8, 0, 0),
      user_id: 'user_id',
    });

    const appointment2 = await fakeAppointmentsRepository.create({
      provider_id: 'provider_id',
      date: new Date(2020, 7, 20, 10, 0, 0),
      user_id: 'user_id',
    });

    const appointments = await listProviderAppointments.execute({
      provider_id: 'provider_id',
      day: 20,
      month: 8,
      year: 2020,
    });

    await expect(appointments).toEqual([appointment1, appointment2]);
  });
});
