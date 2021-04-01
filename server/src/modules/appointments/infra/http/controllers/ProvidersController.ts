import { Request, Response } from 'express';

import { container } from 'tsyringe';

import ListProvidersService from '@modules/appointments/services/ListProvidersService';

class ProvidersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const listPRoviders = container.resolve(ListProvidersService);

    const providers = await listPRoviders.execute({
      user_id,
    });

    return response.json(providers);
  }
}
export default ProvidersController;
