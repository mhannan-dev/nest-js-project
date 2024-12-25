import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { PaginationDto } from 'src/utils/pagination.dto';
import { Like } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async getUserById(id: number): Promise<User> {
    const user = await this.userRepository.findOneById(id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }
  async createUser(user: Partial<User>) {
    const existingUser = await this.userRepository.findOneByEmail(user.email);
    if (existingUser) {
      throw new Error('A user with this email already exists');
    }
    if (user.password) {
      user.password = await this.hashPassword(user.password);
    } else {
      throw new Error('Password is required');
    }

    const newUser = await this.userRepository.save(user as User);

    return {
      message: 'User created successfully',
      user: newUser,
    };
  }
  async findAllData(paginationDto: PaginationDto, search: string = '') {
    const { page, limit } = paginationDto;

    const whereClause = search
      ? [{ email: Like(`%${search}%`) }, { type: Like(`%${search}%`) }]
      : [];

    const [data, total] = await this.userRepository.findAllData(
      paginationDto,
      whereClause,
    );

    const lastPage = Math.ceil(total / limit);

    const nextPageUrl =
      page < lastPage
        ? `/users?page=${page + 1}&limit=${limit}${search ? `&search=${search}` : ''}`
        : null;

    const prevPageUrl =
      page > 1
        ? `/users?page=${page - 1}&limit=${limit}${search ? `&search=${search}` : ''}`
        : null;

    return {
      message: 'Users fetched successfully.',
      data,
      current_page: page,
      total,
      limit,
      last_page: lastPage,
      next_page_url: nextPageUrl,
      prev_page_url: prevPageUrl,
    };
  }

  private async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
  }
}
