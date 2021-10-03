import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { PodcastModule } from './podcast/podcast.module';
import { AuthModule } from './auth/auth.module';
import { MulterModule } from '@nestjs/platform-express';
import { PlaylistModule } from './playlist/playlist.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MulterModule.registerAsync({
      useFactory: () => ({
        dest: './files',
      }),
    }),
    UsersModule,
    PodcastModule,
    AuthModule,
    PlaylistModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
