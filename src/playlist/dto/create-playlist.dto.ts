import { ApiProperty } from '@nestjs/swagger';

export class CreatePlaylistDto {
  @ApiProperty({
    description: 'The playlist name',
    type: String,
  })
  name: string;

  @ApiProperty({
    description: 'The playlist description',
    type: String,
  })
  description: string;
}
