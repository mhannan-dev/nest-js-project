import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Query,
  UsePipes,
  ParseIntPipe,
} from '@nestjs/common';
import { QuizService } from './quiz.service';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { PaginationDto } from 'src/utils/pagination.dto';

@Controller('quiz')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @Get()
  async getAllQuizzes(
    @Query('page', ParseIntPipe) page: number,
    @Query('limit', ParseIntPipe) limit: number,
    @Query('search') search: string,
  ) {
    const paginationDto: PaginationDto = { page, limit };
    return this.quizService.getAllQuizzes(paginationDto, search);
  }

  @Post()
  async createQuiz(@Body() quizData: CreateQuizDto) {
    return this.quizService.createQuiz(quizData);
  }

  @Get(':slug')
  async getQuizBySlug(@Param('slug') slug: string) {
    return this.quizService.getQuizBySlug(slug);
  }
  @Delete(':id')
  async deleteQuiz(@Param('id') id: number) {
    return this.quizService.deleteQuiz(id);
  }
  @Put(':id')
  async updateQuiz(
    @Param('id') id: number,
    @Body() updateQuizDto: UpdateQuizDto,
  ) {
    return this.quizService.updateQuiz(id, updateQuizDto);
  }
}
