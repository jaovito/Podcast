import { HttpException, Injectable } from '@nestjs/common';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PlaylistService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createPlaylistDto: CreatePlaylistDto, userId: string) {
    if (!userId || !createPlaylistDto) {
      throw new HttpException('Invalid data', 400);
    }

    const playList = await this.prisma.playlist.create({
      data: {
        ...createPlaylistDto,
        userId,
      },
    });

    return playList;
  }

  async findAll() {
    const playlists = await this.prisma.playlist.findMany({
      include: {
        User: true,
        podcasts: true,
      },
    });

    return playlists;
  }

  async findOne(id: string) {
    const playlist = await this.prisma.playlist.findUnique({
      where: { id },
      include: {
        User: true,
        podcasts: true,
      },
    });

    return playlist;
  }

  async update(id: string, updatePlaylistDto: UpdatePlaylistDto) {
    const playlist = await this.prisma.playlist.update({
      data: updatePlaylistDto,
      where: { id },
      include: {
        User: true,
        podcasts: true,
      },
    });

    return playlist;
  }

  async remove(id: string) {
    await this.prisma.playlist.delete({
      where: { id },
    });

    return 'DELETED';
  }
}
