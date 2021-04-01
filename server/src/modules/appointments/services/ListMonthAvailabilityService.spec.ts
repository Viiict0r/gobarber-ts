/* eslint-disable no-plusplus */
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListMonthAvailabilityService from './ListMonthAvailabilityService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listMonthAvailability: ListMonthAvailabilityService;

describe('ListMonthAvailability', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listMonthAvailability = new ListMonthAvailabilityService(
      fakeAppointmentsRepository,
    );
  });

  it('should be able to list availability month from provider', async () => {
    const promises = [];

    for (let hour = 8; hour <= 17; hour++) {
      promises.push(
        fakeAppointmentsRepository.create({
          provider_id: 'provider-id',
          date: new Date(2020, 4, 20, hour, 0, 0),
        }),
      );
    }

    await Promise.all(promises);

    await fakeAppointmentsRepository.create({
      provider_id: 'provider-id',
      date: new Date(2020, 4, 21, 8, 0, 0),
    });

    const availability = await listMonthAvailability.execute({
      provider_id: 'provider-id',
      year: 2020,
      month: 5,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { day: 19, available: true },
        { day: 20, available: false },
        { day: 21, available: true },
        { day: 22, available: true },
      ]),
    );
  });
});
