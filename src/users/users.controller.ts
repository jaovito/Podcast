import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  HttpException,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import UserView from './views/UserView';
import { UserDto } from './dto/user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  async create(@Body() createUserDto: CreateUserDto) {
    return UserView.render(await this.usersService.create(createUserDto));
  }

  @Get()
  @ApiResponse({
    status: 200,
    type: [UserDto],
  })
  async findAll() {
    return UserView.renderMany(await this.usersService.findAll());
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    type: UserDto,
  })
  async findOne(@Param('id') id: string) {
    return UserView.render(await this.usersService.findOne(id));
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @ApiResponse({
    status: 200,
    type: [UserDto],
  })
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Request() req,
  ) {
    if (req.user.id !== id) {
      throw new HttpException('Unauthorized', 401);
    }

    return UserView.render(await this.usersService.update(id, updateUserDto));
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'DELETED',
  })
  remove(@Param('id') id: string, @Request() req) {
    if (req.user.id !== id) {
      throw new HttpException('Unauthorized', 401);
    }

    return this.usersService.remove(id);
  }
}
