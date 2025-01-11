import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { EducationalLevel } from 'src/educational-level/educational-level.entity';
import { Subject } from 'src/subject/subject.entity';
import { District } from 'src/district/district.entity';
import { Contribution } from 'src/contribution/contribution.entity';
import { Subscription } from 'src/subscription/subscription.entity';

@Entity('books')
export class Book {
  @PrimaryGeneratedColumn()
  id: number;
  @ManyToOne(() => Book, (book) => book.subscriptions)
  book: Book;

  @Column()
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ default: false })
  isPublished: boolean; // Status of publication

  @Column({ type: 'timestamp', nullable: true })
  publicationDate: Date; // Date of publication (optional)

  @ManyToOne(() => Subject, (subject) => (subject as Subject).books, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  subject: Subject; // Subject the book belongs to

  @ManyToOne(
    () => EducationalLevel,
    (level) => (level as EducationalLevel).books,
    {
      nullable: false,
      onDelete: 'CASCADE',
    },
  )
  level: EducationalLevel;

  @ManyToOne(() => District, (district) => (district as District).books, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  district: District;

  @OneToMany(() => Contribution, (contribution) => contribution.book)
  contributions: Contribution[];

  @OneToMany(() => Subscription, (subscription) => subscription.book)
  subscriptions: Subscription[]; // Subscriptions for the book
}
