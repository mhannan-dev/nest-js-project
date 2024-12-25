import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { PaginationDto } from 'src/utils/pagination.dto';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() user: CreateUserDto) {
    try {
      return await this.userService.createUser(user);
    } catch (error) {
      throw new HttpException(
        error.message || 'Internal server error',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
  @Get()
  async index(
    @Query('page', ParseIntPipe) page: number,
    @Query('limit', ParseIntPipe) limit: number,
    @Query('search') search: string,
  ) {
    const paginationDto: PaginationDto = { page, limit };
    return await this.userService.findAllData(paginationDto, search);
  }

  @Get(':id')
  async show(@Param('id') id: number) {
    return await this.userService.getUserById(id);
  }

  // @Post(':id')
  // async update(@Param('id') id: number, @Body() updateUserDto: User) {
  //   return await this.userService.update(id, updateUserDto);
  // }

  // @Delete(':id')
  // async delete(@Param('id') id: number) {
  //   return await this.userService.delete(id);
  // }
}
