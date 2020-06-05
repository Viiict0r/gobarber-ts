import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

describe('CreateAppointment', () => {
  it('should be able to create a new appointment', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );

    const appoinment = await createAppointment.execute({
      date: new Date(),
      provider_id: '123123123123',
    });

    expect(appoinment).toHaveProperty('id');
    expect(appoinment.provider_id).toBe('123123123123');
  });

  // it('should not be able to create two appointment on the same time', () => {
  //   expect(1 + 2).toBe(3);
  // });
});
