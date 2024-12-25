import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationDto } from 'src/utils/pagination.dto';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {}

  findAllData(paginationDto: PaginationDto, whereClause: any) {
    return this.repository.findAndCount({
      where: whereClause,
      skip: (paginationDto.page - 1) * paginationDto.limit,
      take: paginationDto.limit,
      order: { id: 'DESC' },
    });
  }

  findOneById(id: number): Promise<User | null> {
    return this.repository.findOneBy({ id });
  }

  findOneByEmail(email: string) {
    return this.repository.findOneBy({ email });
  }

  create(user: Partial<User>) {
    return this.repository.create(user);
  }

  save(user: User) {
    return this.repository.save(user);
  }

  update(id: number, user: Partial<User>) {
    return this.repository.update(id, user);
  }

  delete(id: number) {
    return this.repository.delete(id);
  }
}
