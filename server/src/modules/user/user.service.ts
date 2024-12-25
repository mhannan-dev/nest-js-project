import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async findAll() {
    return this.userRepository.findAll();
  }

  async findOneById(id: number) {
    const user = await this.userRepository.findOneById(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async create(createUserDto: CreateUserDto) {
    return this.userRepository.create(createUserDto);
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.findOneById(id);
    return this.userRepository.update(id, { ...user, ...updateUserDto });
  }

  async delete(id: number) {
    const user = await this.findOneById(id);
    return this.userRepository.delete(id);
  }
}
