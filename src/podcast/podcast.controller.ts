import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  Res,
  StreamableFile,
  UseGuards,
  HttpException,
} from '@nestjs/common';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { diskStorage } from 'multer';

import { PodcastService } from './podcast.service';
import { CreatePodcastDto } from './dto/create-podcast.dto';
import { UpdatePodcastDto } from './dto/update-podcast.dto';
import { editFileName, imageFileFilter } from './audioFilter';
import { FileUploadDto } from './dto/fileUpload.dto';
import { createReadStream } from 'fs';
import { join } from 'path';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('Podcasts')
@Controller('podcast')
export class PodcastController {
  constructor(private readonly podcastService: PodcastService) {}

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './files',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'List of cats',
    type: FileUploadDto,
  })
  @Post()
  create(
    @Body() createPodcastDto: CreatePodcastDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const body = {
      ...createPodcastDto,
      key: file.filename,
      url: file.originalname,
    };

    return this.podcastService.create(body);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/playlist')
  addToPlaylist(@Body() body) {
    const { id, playlist_id } = body;

    return this.podcastService.addToPlaylist(id, playlist_id);
  }

  @Get()
  findAll() {
    return this.podcastService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':song')
  seeUploadedFile(@Param('song') song, @Res() res) {
    return res.sendFile(song, { root: './files' });
  }

  @UseGuards(JwtAuthGuard)
  @Get('/stream/:id')
  async streamFile(@Param('id') id): Promise<StreamableFile> {
    const podcast = await this.podcastService.findOne(id);

    if (!podcast) {
      throw new HttpException('Podcast does not exists', 400);
    }

    const file = createReadStream(
      join(process.cwd(), `./files/${podcast.key}`),
    );

    return new StreamableFile(file);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.podcastService.findOne(id);
  }

  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './files',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  @ApiConsumes('multipart/form-data')
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePodcastDto: UpdatePodcastDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const body = {
      ...updatePodcastDto,
      key: file.filename,
      url: file.originalname,
    };

    return this.podcastService.update(id, body);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.podcastService.remove(id);
  }
}
