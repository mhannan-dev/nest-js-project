import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Book } from '../book/book.entity';
import { OneToMany } from 'typeorm';

@Entity('subjects')
export class Subject {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Book, (book) => book.subject)
  books: Book[];
}
