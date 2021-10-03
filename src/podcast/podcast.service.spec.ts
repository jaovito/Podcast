import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma.service';
import { PodcastService } from './podcast.service';

describe('PodcastService', () => {
  let service: PodcastService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PodcastService, PrismaService],
    }).compile();

    service = module.get<PodcastService>(PodcastService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
