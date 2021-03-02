import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import AuthenticateUserService from './AuthenticateUserService';

import CreateUserService from './CreateUserService';

describe('AuthenticateUser', () => {
  it('should be able to authenticate', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const authUser = new AuthenticateUserService(fakeUsersRepository);

    const createUser = new CreateUserService(fakeUsersRepository);

    const user = await createUser.execute({
      name: 'John',
      email: 'random@example.com',
      password: '123456',
    });

    const response = await authUser.execute({
      email: 'random@example.com',
      password: '123456',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  it('should not be able to authenticate with non existing user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const authUser = new AuthenticateUserService(fakeUsersRepository);

    expect(
      authUser.execute({
        email: 'random@example.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with wrong password', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const authUser = new AuthenticateUserService(fakeUsersRepository);

    const createUser = new CreateUserService(fakeUsersRepository);

    createUser.execute({
      name: 'John',
      email: 'random@example.com',
      password: '123456',
    });

    expect(
      authUser.execute({
        email: 'random@example.com',
        password: 'wrong-password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
