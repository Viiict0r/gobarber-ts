import { injectable, inject } from 'tsyringe';
import { getHours } from 'date-fns';

import IAppointmentRepository from '../repositories/IAppointmentRepository';

interface IRequest {
  provider_id: string;
  month: number;
  year: number;
  day: number;
}

type IResponse = Array<{
  hour: number;
  available: boolean;
}>;

@injectable()
class ListProviderDayAvailabilityService {
  constructor(
    @inject('AppointmentsRepository')
    private appoinmentRepository: IAppointmentRepository,
  ) {}

  public async execute({
    provider_id,
    year,
    month,
    day,
  }: IRequest): Promise<IResponse> {
    const appoinments = await this.appoinmentRepository.findAllInDayFromProvider(
      {
        provider_id,
        year,
        month,
        day,
      },
    );

    const hourStart = 8;

    const eachHourArray = Array.from(
      { length: 10 },
      (_, index) => index + hourStart,
    );

    const availability = eachHourArray.map(hour => {
      const hasAppoinmentInHour = appoinments.find(
        appoinment => getHours(appoinment.date) === hour,
      );

      return {
        hour,
        available: !hasAppoinmentInHour,
      };
    });

    return availability;
  }
}

export default ListProviderDayAvailabilityService;
