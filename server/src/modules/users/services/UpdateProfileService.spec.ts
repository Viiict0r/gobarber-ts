import AppError from '@shared/errors/AppError';
import { compareSync } from 'bcryptjs';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import UpdateProfileService from './UpdateProfileService';

let fakeUsersRepository: FakeUsersRepository;
let updateProfile: UpdateProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    updateProfile = new UpdateProfileService(fakeUsersRepository);
  });

  it('should be able to update the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John doe',
      email: 'example@email.com',
      password: '123123',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'John Doe Silva',
      email: 'other@email.com',
    });

    expect(updatedUser?.name).toBe('John Doe Silva');
  });

  it('should not be able to change email with another user email', async () => {
    await fakeUsersRepository.create({
      name: 'John doe',
      email: 'example@email.com',
      password: '123123',
    });

    const user = await fakeUsersRepository.create({
      name: 'Test user',
      email: 'test@email.com',
      password: '123123',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'John Doe Silva',
        email: 'example@email.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John doe',
      email: 'example@email.com',
      password: '123456',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'John Doe Silva',
      email: 'other@email.com',
      old_password: '123456',
      password: '123123',
    });

    expect(compareSync('123123', updatedUser?.password)).toBe(true);
  });

  it('should not be able to update the password without old_password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John doe',
      email: 'example@email.com',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'John Doe Silva',
        email: 'other@email.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the password with wrong old_password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John doe',
      email: 'example@email.com',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'John Doe Silva',
        email: 'other@email.com',
        old_password: 'wrong-old-password',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
