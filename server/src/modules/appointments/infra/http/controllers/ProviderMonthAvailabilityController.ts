import { Request, Response } from 'express';

import { container } from 'tsyringe';

import ListMonthAvailabilityService from '@modules/appointments/services/ListMonthAvailabilityService';

class ProviderMonthAvailibilityController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { provider_id } = request.params;
    const { month, year } = request.query;

    const listProviderMonthAvailability = container.resolve(
      ListMonthAvailabilityService,
    );

    const availability = await listProviderMonthAvailability.execute({
      provider_id,
      month: Number(month),
      year: Number(year),
    });

    return response.json(availability);
  }
}
export default ProviderMonthAvailibilityController;
