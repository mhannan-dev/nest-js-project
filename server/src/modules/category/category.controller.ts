import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { PaginationDto } from 'src/utils/pagination.dto';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryService } from './category.service';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async getAllCategories(
    @Query('page', ParseIntPipe) page: number,
    @Query('limit', ParseIntPipe) limit: number,
    @Query('search') search: string,
  ) {
    const paginationDto: PaginationDto = { page, limit };
    return this.categoryService.getAllCategories(paginationDto, search);
  }

  @Post()
  async createCategory(@Body() categoryData: CreateCategoryDto) {
    return this.categoryService.createCategory(categoryData);
  }

  @Get(':slug')
  async getCategoryBySlug(@Param('slug') slug: string) {
    return this.categoryService.getCategoryBySlug(slug);
  }

  @Delete(':id')
  async deleteCategory(@Param('id') id: number) {
    return this.categoryService.deleteCategory(id);
  }

  @Put(':id')
  async updateCategory(
    @Param('id') id: number,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoryService.updateCategory(id, updateCategoryDto);
  }
}
