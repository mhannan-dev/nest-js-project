import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {}

  findAll() {
    return this.repository.find();
  }

  findOneById(id: number) {
    return this.repository.findOneBy({ id });
  }

  findOneByEmail(email: string) {
    return this.repository.findOneBy({ email });
  }

  create(user: Partial<User>) {
    return this.repository.save(user);
  }

  update(id: number, user: Partial<User>) {
    return this.repository.update(id, user);
  }

  delete(id: number) {
    return this.repository.delete(id);
  }
}
