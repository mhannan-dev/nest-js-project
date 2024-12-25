import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import slugify from 'slugify';
import { PaginationDto } from 'src/utils/pagination.dto';
import { Category } from './category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  // Create a category
  async createCategory(
    categoryData: CreateCategoryDto,
  ): Promise<{ message: string; category: Category }> {
    const slug = slugify(categoryData.name, { lower: true });

    // Check if a category with the same slug exists
    const existingCategory = await this.categoryRepository.findOne({
      where: { slug },
    });
    if (existingCategory) {
      throw new ConflictException('A category with this name already exists');
    }

    // Create and save the new category
    const newCategory = this.categoryRepository.create({
      name: categoryData.name,
      parent_id: categoryData.parent_id,
      slug,
      status: categoryData.status ?? true,
    });

    await this.categoryRepository.save(newCategory);

    return {
      message: 'Category created successfully',
      category: newCategory,
    };
  }

  // Fetch all categories with pagination and optional search
  async getAllCategories(
    paginationDto: PaginationDto,
    search: string = '',
  ): Promise<any> {
    const { page, limit } = paginationDto;

    const whereClause = search ? [{ name: Like(`%${search}%`) }] : [];

    const [data, total] = await this.categoryRepository.findAndCount({
      where: whereClause,
      skip: (page - 1) * limit,
      take: limit,
      order: { id: 'DESC' },
    });

    const lastPage = Math.ceil(total / limit);

    return {
      message: 'Categories fetched successfully',
      data,
      current_page: page,
      total,
      limit,
      last_page: lastPage,
      next_page_url:
        page < lastPage
          ? `/categories?page=${page + 1}&limit=${limit}${
              search ? `&search=${search}` : ''
            }`
          : null,
      prev_page_url:
        page > 1
          ? `/categories?page=${page - 1}&limit=${limit}${
              search ? `&search=${search}` : ''
            }`
          : null,
    };
  }

  // Get a category by slug
  async getCategoryBySlug(slug: string): Promise<Category> {
    const category = await this.categoryRepository.findOne({ where: { slug } });
    if (!category) {
      throw new NotFoundException(`Category with slug "${slug}" not found`);
    }
    return category;
  }

  // Delete a category
  async deleteCategory(id: number): Promise<{ message: string }> {
    const category = await this.categoryRepository.findOne({ where: { id } });
    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }

    await this.categoryRepository.delete(id);

    return { message: `Category with ID ${id} deleted successfully` };
  }

  // Update a category
  async updateCategory(
    id: number,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<{ message: string; category: Category }> {
    const category = await this.categoryRepository.findOne({ where: { id } });
    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }

    // Check if the new name (if provided) conflicts with an existing category
    if (updateCategoryDto.name) {
      const slug = slugify(updateCategoryDto.name, { lower: true });
      const existingCategory = await this.categoryRepository.findOne({
        where: { slug },
      });
      if (existingCategory && existingCategory.id !== id) {
        throw new ConflictException('A category with this name already exists');
      }
      category.name = updateCategoryDto.name;
      category.slug = slug;
    }

    if (updateCategoryDto.status !== undefined) {
      category.status = updateCategoryDto.status;
    }

    if (updateCategoryDto.parent_id !== undefined) {
      category.parent_id = updateCategoryDto.parent_id;
    }

    await this.categoryRepository.save(category);

    return { message: 'Category updated successfully', category };
  }
}
