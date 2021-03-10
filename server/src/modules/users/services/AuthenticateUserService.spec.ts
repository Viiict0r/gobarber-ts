import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import AuthenticateUserService from './AuthenticateUserService';

import CreateUserService from './CreateUserService';

let fakeUsersRepository: FakeUsersRepository;
let authUser: AuthenticateUserService;
let createUser: CreateUserService;

describe('AuthenticateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    authUser = new AuthenticateUserService(fakeUsersRepository);
    createUser = new CreateUserService(fakeUsersRepository);
  });

  it('should be able to authenticate', async () => {
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
    await expect(
      authUser.execute({
        email: 'random@example.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with wrong password', async () => {
    createUser.execute({
      name: 'John',
      email: 'random@example.com',
      password: '123456',
    });

    await expect(
      authUser.execute({
        email: 'random@example.com',
        password: 'wrong-password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
