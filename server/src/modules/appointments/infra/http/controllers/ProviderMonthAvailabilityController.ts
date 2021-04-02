import { Request, Response } from 'express';

import { container } from 'tsyringe';

import ListMonthAvailabilityService from '@modules/appointments/services/ListMonthAvailabilityService';

class ProviderMonthAvailibilityController {
  public async index(request: Request, response: Response): Promise<Response> {
    const provider_id = request.params.id;
    const { month, year } = request.body;

    const listProviderMonthAvailability = container.resolve(
      ListMonthAvailabilityService,
    );

    const availability = await listProviderMonthAvailability.execute({
      provider_id,
      month,
      year,
    });

    return response.json(availability);
  }
}
export default ProviderMonthAvailibilityController;
