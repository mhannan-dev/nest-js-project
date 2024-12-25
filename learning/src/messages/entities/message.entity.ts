import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  content: string;

  @Column({ nullable: true })
  author: string;
}
