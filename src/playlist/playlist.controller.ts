import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  UseGuards,
} from '@nestjs/common';
import { PlaylistService } from './playlist.service';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import PlaylistViews from './views/PlaylistViews';

@Controller('playlist')
export class PlaylistController {
  constructor(private readonly playlistService: PlaylistService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createPlaylistDto: CreatePlaylistDto, @Request() req) {
    return await this.playlistService.create(createPlaylistDto, req.user.id);
  }

  @Get()
  async findAll() {
    return PlaylistViews.renderMany(await this.playlistService.findAll());
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return PlaylistViews.render(await this.playlistService.findOne(id));
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePlaylistDto: UpdatePlaylistDto,
  ) {
    return PlaylistViews.render(
      await this.playlistService.update(id, updatePlaylistDto),
    );
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.playlistService.remove(id);
  }
}
