import { EntityRepository, Repository } from 'typeorm';
import { Category } from './category.entity';

@EntityRepository(Category)
export class CategoryRepository extends Repository<Category> {
  async getCategoryBySlug(slug: string): Promise<Category | undefined> {
    return this.findOne({ where: { slug } });
  }

  async getCategoryByName(name: string): Promise<Category | undefined> {
    return this.findOne({ where: { name } });
  }
  async getCategoriesByParentId(parentId: number): Promise<Category[]> {
    return this.find({ where: { parent_id: parentId } });
  }
}
