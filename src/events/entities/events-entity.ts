import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('events')
export class Events {
  @PrimaryGeneratedColumn()
  id!: number;
  @Column()
  title!: string;
  @Column()
  content!: string;
  @Column()
  isActive!: boolean;
  @Column()
  createdAt!: Date;
  @Column()
  venue!: string;
}
