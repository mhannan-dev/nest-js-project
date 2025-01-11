import { Book } from 'src/book/book.entity';
import { User } from 'src/user/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity('districts')
export class District {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  state: string;

  @Column()
  country: string;

  @Column({ nullable: true })
  description: string;

  @OneToMany(() => User, (user) => user.district)
  users: User[];

  @OneToMany(() => Book, (book) => book.district)
  books: Book[];
}
