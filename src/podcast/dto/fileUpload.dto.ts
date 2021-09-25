import { ApiProperty } from '@nestjs/swagger';

export class FileUploadDto {
  @ApiProperty({
    description: 'The podcast name',
    type: String,
  })
  name: string;

  @ApiProperty({
    description: 'The description of podcast',
    type: String,
  })
  description: string;

  @ApiProperty({ type: 'string', format: 'binary' })
  file: any;
}
