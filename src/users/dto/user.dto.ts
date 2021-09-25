import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty({
    description: 'The id of user',
    type: String,
  })
  id: string;

  @ApiProperty({
    description: 'The name of user',
    type: String,
  })
  name: string;

  @ApiProperty({
    description: 'The email of user',
    type: String,
  })
  email: string;

  @ApiProperty({
    description: 'The time when user was created',
    type: Date,
  })
  created_at: Date;
}
