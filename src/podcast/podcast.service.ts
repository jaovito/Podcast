import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreatePodcastDto } from './dto/create-podcast.dto';
import { UpdatePodcastDto } from './dto/update-podcast.dto';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class PodcastService {
  constructor(private prisma: PrismaService) {}

  async create(createPodcastDto: CreatePodcastDto) {
    const podcast = await this.prisma.podcast.create({
      data: createPodcastDto,
    });

    return podcast;
  }

  async findAll() {
    const podcasts = await this.prisma.podcast.findMany({
      orderBy: {
        created_at: 'desc',
      },
      include: {
        playlists: true,
      },
    });

    return podcasts;
  }

  async findOne(id: string) {
    const podcast = await this.prisma.podcast.findUnique({
      where: { id },
      include: {
        playlists: true,
      },
    });

    return podcast;
  }

  async update(id: string, updatePodcastDto: UpdatePodcastDto) {
    const podcast = await this.prisma.podcast.update({
      data: updatePodcastDto,
      where: { id },
      include: {
        playlists: true,
      },
    });

    return podcast;
  }

  async addToPlaylist(id: string, playlistId: string) {
    await this.prisma.podcast.update({
      data: {
        playlists: {
          connect: {
            id: playlistId,
          },
        },
      },
      where: { id },
    });

    return 'ADDED';
  }

  async remove(id: string) {
    const podcast = await this.prisma.podcast.findUnique({
      where: { id },
    });

    const url = path.resolve(__dirname, '..', '..', 'files', podcast.key);

    fs.unlink(url, (cb) => {
      console.log(cb);
    });

    await this.prisma.podcast.delete({
      where: { id },
    });

    return {
      status: 'DELETED',
    };
  }
}
