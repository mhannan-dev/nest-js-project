import { Book } from 'src/book/book.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity('subscriptions')
export class Subscription {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Book, (book) => book.subscriptions)
  book: Book;

  @Column()
  studentId: number;

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;
}
