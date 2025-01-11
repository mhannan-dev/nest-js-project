import { Book } from 'src/book/book.entity';
import { User } from 'src/user/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity('contributions')
export class Contribution {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Book, (book) => book.contributions, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  book: Book;

  @ManyToOne(() => User, { nullable: false, onDelete: 'CASCADE' })
  contributor: User;

  @Column()
  role: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  contributionDate: Date;
}
