import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListProviderAppointmentsService from './ListProviderAppointmentsService';

let fakeAppointMentsRepository: FakeAppointmentsRepository;
let listProviderAppointment: ListProviderAppointmentsService;
let fakeCacheProvider: FakeCacheProvider;

describe('ListProviderAppointments', () => {
  beforeAll(() => {
    fakeAppointMentsRepository = new FakeAppointmentsRepository();
    fakeCacheProvider = new FakeCacheProvider();

    listProviderAppointment = new ListProviderAppointmentsService(
      fakeAppointMentsRepository,
      fakeCacheProvider,
    );
  });

  it('should be able to list the appointments on a speciffic day', async () => {
    const appointment1 = await fakeAppointMentsRepository.create({
      provider_id: 'provider-id',
      user_id: 'user',
      date: new Date(2020, 4, 20, 14, 0, 0),
    });

    const appointment2 = await fakeAppointMentsRepository.create({
      provider_id: 'provider-id',
      user_id: 'user',
      date: new Date(2020, 4, 20, 15, 0, 0),
    });

    const appointments = await listProviderAppointment.execute({
      provider_id: 'provider-id',
      year: 2020,
      month: 5,
      day: 20,
    });

    expect(appointments).toEqual([appointment1, appointment2]);
  });
});
