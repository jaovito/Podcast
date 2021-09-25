import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
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
    description: 'The user password',
    type: String,
  })
  password: string;
}
