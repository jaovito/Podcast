import { User } from '.prisma/client';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma.service';
import { UserDto } from './dto/user.dto';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;
  let firstUser: UserDto;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService, PrismaService],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);

    const user = {
      id: '5b10c4f8-1497-4e27-b3bf-9952ba897f52',
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      created_at: '2021-06-18T02:01:25.000Z',
    };

    const SPY = jest.fn(() => user) as any;
    jest.spyOn(service, 'create').mockImplementation(() => SPY(user));
    firstUser = await controller.create(user);
  });

  describe('Find users', () => {
    it('should be able to find all users', async () => {
      const result = [firstUser] as any;
      jest.spyOn(service, 'findAll').mockImplementation(() => result);

      expect(await controller.findAll()).toStrictEqual(result);
    });

    it('should ble able to find a unique user', async () => {
      const id = firstUser.id;
      const result = firstUser as User;
      jest.spyOn(service, 'findOne').mockImplementation(async () => result);

      expect(await controller.findOne(id)).toStrictEqual(result);
    });
  });

  describe('Create, Update, Delete', () => {
    it('should be able to crate an user', async () => {
      const user = {
        id: '5b10c4f8-1497-4e27-b3bf-9952ba897f52',
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: '123456',
        created_at: '2021-06-18T02:01:25.000Z',
      };

      const result = {} as User;
      jest.spyOn(service, 'create').mockImplementation(async () => result);

      expect(await controller.create(user)).toEqual(result);
    });

    it('should be able to update an user', async () => {
      const id = firstUser.id;
      const updateUser = {
        id: '5b10c4f8-1497-4e27-b3bf-9952ba897f52',
        name: 'John Doe Edited',
        email: 'johndoeediy@example.com',
        password: 'johndoe123',
        created_at: '2021-06-18T02:01:25.000Z',
      };

      const req = { user: updateUser };

      const result = {} as User;
      jest.spyOn(service, 'update').mockImplementation(async () => result);

      expect(await controller.update(id, updateUser, req)).toEqual(result);
    });

    it('should be able to delete an user', async () => {
      const id = firstUser.id;

      const req = {
        user: {
          id,
        },
      };

      const result = 'DELETED';
      jest.spyOn(service, 'remove').mockImplementation(async () => result);

      expect(await controller.remove(id, req)).toEqual(result);
    });
  });
});
