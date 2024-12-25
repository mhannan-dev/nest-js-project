import { EntityRepository, Repository } from 'typeorm';
import { Quiz } from './quiz.entity';

@EntityRepository(Quiz) // Use this decorator to associate the repository with the Quiz entity
export class QuizRepository extends Repository<Quiz> {
  // Custom repository methods
  async getQuizBySlug(slug: string): Promise<Quiz | undefined> {
    return this.findOne({ where: { slug } });
  }

  async getQuizByQuestion(question: string): Promise<Quiz | undefined> {
    return this.findOne({ where: { question } });
  }
}
