import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma.service';
import { PodcastController } from './podcast.controller';
import { PodcastService } from './podcast.service';

describe('PodcastController', () => {
  let controller: PodcastController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PodcastController],
      providers: [PodcastService, PrismaService],
    }).compile();

    controller = module.get<PodcastController>(PodcastController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
