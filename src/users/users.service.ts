import { HttpException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma.service';
import { User } from '@prisma/client';

import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const userExists = await this.prisma.user.findUnique({
      where: { email: createUserDto.email },
    });

    if (userExists) {
      throw new HttpException('User already exists', 400);
    }

    const hashPassword = await bcrypt.hashSync(
      createUserDto.password,
      process.env.HASH_PASSWORD,
    );

    const user = await this.prisma.user.create({
      data: { password: hashPassword, ...createUserDto },
    });

    return user;
  }

  async findAll(): Promise<User[]> {
    const users = await this.prisma.user.findMany({
      orderBy: {
        created_at: 'asc',
      },
    });

    return users;
  }

  async findOne(id: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.prisma.user.update({
      data: updateUserDto,
      where: { id },
    });

    return user;
  }

  async remove(id: string) {
    return `This action removes a #${id} user`;
  }
}
