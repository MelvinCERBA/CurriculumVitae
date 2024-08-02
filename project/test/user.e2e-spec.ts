import { HttpStatus, INestApplication, ValidationPipe } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import * as request from 'supertest';
import { getRepositoryToken } from "@nestjs/typeorm";
import { User } from "../src/user/entities/user.entity";
import { UserController } from "../src/user/user.controller";
import { CreateUserDto } from "../src/user/dto/create-user.dto";
import { Repository } from "typeorm";
import { UserService } from "../src/user/user.service";

describe('User (e2e)', () => {
  let app: INestApplication;
  let userRepository: Partial<Repository<User>> = {
    findOne: jest.fn().mockImplementation(({ email }) => {
      return {
        id: 1,
        first_name: 'John',
        last_name: 'Doe',
        email,
        passworkHash: 'hashed',
        description: 'description'
      }
    }),
    save: jest.fn().mockImplementation((user) => {
      const { password, ...rest } = user;
      return Promise.resolve({ ...rest, id: 1, description: 'description', passwordHash: 'hashed' })
    })
  }
  let spyOnAuthSvcLogIn;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: userRepository
        },
      ],
    }).compile()

    app = module.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  describe('User creation', () => {

    it('should create a user', async () => {
      const userToCreate: CreateUserDto = {
        first_name: 'John',
        last_name: 'Doe',
        email: 'j@j.com',
        description: 'description',
        password: 'password'
      }
      await request(app.getHttpServer())
        .post('/user')
        .send(userToCreate)
        .expect(HttpStatus.CREATED)
        .expect({
          id: 1,
          first_name: 'John',
          last_name: 'Doe',
          description: 'description',
          email: 'j@j.com',
        })
    });
  })
})