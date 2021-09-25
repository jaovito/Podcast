import { ApiProperty } from '@nestjs/swagger';

export class CreatePodcastDto {
  name: string;
  description: string;
  url: string;
  key: string;
}
