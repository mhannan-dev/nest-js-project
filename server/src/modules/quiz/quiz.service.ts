import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { CreateQuizDto } from './dto/create-quiz.dto';
import slugify from 'slugify';
import { Quiz } from './quiz.entity';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { PaginationDto } from 'src/utils/pagination.dto';

@Injectable()
export class QuizService {
  constructor(
    @InjectRepository(Quiz)
    private readonly quizRepository: Repository<Quiz>,
  ) {}

  // Create a quiz
  async createQuiz(
    quizData: CreateQuizDto,
  ): Promise<{ message: string; quiz: Quiz }> {
    const slug = slugify(quizData.question, { lower: true });

    const existingQuiz = await this.quizRepository.findOne({ where: { slug } });
    if (existingQuiz) {
      throw new NotFoundException('A quiz with this question already exists');
    }

    const newQuiz = this.quizRepository.create({
      title: quizData.title,
      question: quizData.question,
      slug,
    });

    await this.quizRepository.save(newQuiz);

    return {
      message: 'Quiz created successfully',
      quiz: newQuiz,
    };
  }
  async getAllQuizzes(paginationDto: PaginationDto, search: string = '') {
    const { page, limit } = paginationDto;

    // Build query based on search input
    const whereClause = search
      ? [
          { title: Like(`%${search}%`) },
          { question: Like(`%${search}%`) },
        ]
      : [];

    const [data, total] = await this.quizRepository.findAndCount({
      where: whereClause,
      skip: (page - 1) * limit,
      take: limit,
      order: { id: 'DESC' },
    });

    const lastPage = Math.ceil(total / limit);

    // Conditionally add search to next/prev page URLs if search is not empty
    const nextPageUrl = page < lastPage
      ? `/quiz?page=${page + 1}&limit=${limit}${search ? `&search=${search}` : ''}`
      : null;

    const prevPageUrl = page > 1
      ? `/quiz?page=${page - 1}&limit=${limit}${search ? `&search=${search}` : ''}`
      : null;

    return {
      message: 'Quizzes fetched successfully.',
      data,
      current_page: page,
      total,
      limit,
      last_page: lastPage,
      next_page_url: nextPageUrl,
      prev_page_url: prevPageUrl,
    };
  }


  // Get a quiz by slug
  async getQuizBySlug(slug: string): Promise<Quiz> {
    const quiz = await this.quizRepository.findOne({ where: { slug } });
    if (!quiz) {
      throw new NotFoundException(`Quiz with slug "${slug}" not found`);
    }
    return quiz;
  }

  // Delete a quiz
  async deleteQuiz(id: number): Promise<{ message: string }> {
    // Find the quiz by ID
    const quiz = await this.quizRepository.findOne({ where: { id } });
    if (!quiz) {
      throw new NotFoundException(`Quiz with ID ${id} not found`);
    }

    // Delete the quiz
    await this.quizRepository.delete(id);

    return {
      message: `Quiz with ID ${id} deleted successfully`,
    };
  }

  // Update a quiz
  async updateQuiz(
    id: number,
    updateQuizDto: UpdateQuizDto,
  ): Promise<{ message: string; quiz: Quiz }> {
    // Find the quiz by ID
    const quiz = await this.quizRepository.findOne({ where: { id } });
    if (!quiz) {
      throw new NotFoundException(`Quiz with ID ${id} not found`);
    }

    // Check if the question already exists (if being updated)
    if (updateQuizDto.question) {
      const existingQuiz = await this.quizRepository.findOne({
        where: { question: updateQuizDto.question },
      });
      if (existingQuiz && existingQuiz.id !== id) {
        throw new ConflictException('A quiz with this question already exists');
      }
      quiz.slug = slugify(updateQuizDto.question, { lower: true });
    }

    // Update the quiz fields
    if (updateQuizDto.title) quiz.title = updateQuizDto.title;
    if (updateQuizDto.question) quiz.question = updateQuizDto.question;

    // Save the updated quiz
    await this.quizRepository.save(quiz);

    return {
      message: 'Quiz updated successfully',
      quiz,
    };
  }
}
