import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

describe('UserService', () => {
  let service: UserService;
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            save: jest.fn().mockImplementation((user) => {
              const { password, ...rest } = user;
              return Promise.resolve({ ...rest, id: 1, passwordHash: 'hashed' });
            }),
            findOneBy: jest.fn().mockImplementation(({ email }) => {
              return Promise.resolve({
                id: 1,
                first_name: 'John',
                last_name: 'Doe',
                email,
                passwordHash: 'hashed'
              });
            }),
          }
        },

      ],
      controllers: [UserController]
    }).compile();

    service = module.get<UserService>(UserService);
    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a user', async () => {
    const user = await service.create({ first_name: 'John', last_name: 'Doe', email: 'j@j.com', description: 'description', password: 'password' });
    expect(user).toEqual({
      id: 1,
      first_name: 'John',
      last_name: 'Doe',
      email: 'j@j.com',
      passwordHash: 'hashed'
    });
  })
});


