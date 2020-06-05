import { Router } from 'express';

import AuthenticatedUserService from '@modules/users/services/AuthenticateUserService';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  const { email, password } = request.body;

  const usersRepository = new UsersRepository();
  const authenticateUser = new AuthenticatedUserService(usersRepository);

  const { user, token } = await authenticateUser.execute({ email, password });

  return response.json({ user, token });
});

export default sessionsRouter;
