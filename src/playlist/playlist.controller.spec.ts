import { Test, TestingModule } from '@nestjs/testing';
import { UserDto } from '../users/dto/user.dto';
import { PrismaService } from '../prisma.service';
import { PlaylistController } from './playlist.controller';
import { PlaylistService } from './playlist.service';
import { UsersService } from '../users/users.service';
import { UsersController } from '../users/users.controller';
import { Playlist } from 'prisma/prisma-client';

describe('PlaylistController', () => {
  let controller: PlaylistController;
  let service: PlaylistService;
  let firstUser: UserDto;
  let firstPlaylist: Playlist;
  let userService: UsersService;
  let userController: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlaylistController, UsersController],
      providers: [PlaylistService, UsersService, PrismaService],
    }).compile();

    controller = module.get<PlaylistController>(PlaylistController);
    service = module.get<PlaylistService>(PlaylistService);
    userService = module.get<UsersService>(UsersService);
    userController = module.get<UsersController>(UsersController);

    const user = {
      id: '5b10c4f8-1497-4e27-b3bf-9952ba897f52',
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      created_at: '2021-06-18T02:01:25.000Z',
    };

    const SPY = jest.fn(() => user) as any;
    jest.spyOn(userService, 'create').mockImplementation(() => SPY(user));
    firstUser = await userController.create(user);

    const firstPlaylistDto = {
      name: 'João2',
      description: 'uma playtlist',
    };

    const req = {
      user: {
        id: user.id,
      },
    };

    const SPYpl = jest.fn(() => firstPlaylistDto) as any;
    jest
      .spyOn(service, 'create')
      .mockImplementation(() => SPYpl(firstPlaylistDto));
    firstPlaylist = await controller.create(firstPlaylistDto, req);
  });

  describe('Find playlists', () => {
    it('should be able to find all playlists', async () => {
      const result = [firstPlaylist] as any;
      jest.spyOn(service, 'findAll').mockImplementation(async () => result);

      expect(await controller.findAll()).toStrictEqual(result);
    });

    it('should be able to find one playlist', async () => {
      const result = {} as any;
      const id = firstPlaylist.id;
      jest.spyOn(service, 'findOne').mockImplementation(async () => result);

      expect(await controller.findOne(id)).toBe(result);
    });
  });
});
