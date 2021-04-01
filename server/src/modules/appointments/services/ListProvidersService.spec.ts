import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ListProvidersService from './ListProvidersService';

let fakeUsersRepository: FakeUsersRepository;
let listProviders: ListProvidersService;

describe('ListProviders', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    listProviders = new ListProvidersService(fakeUsersRepository);
  });

  it('should be able to list all providers', async () => {
    const user1 = await fakeUsersRepository.create({
      name: 'John doe',
      email: 'example@email.com',
      password: '123123',
    });

    const user2 = await fakeUsersRepository.create({
      name: 'John doe 2',
      email: 'example2@email.com',
      password: '123123',
    });

    const loggedUser = await fakeUsersRepository.create({
      name: 'John doe 3',
      email: 'example3@email.com',
      password: '123123',
    });

    const providers = await listProviders.execute({ user_id: loggedUser.id });

    expect(providers).toEqual([user1, user2]);
  });
});
