import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('results')
export class Result {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    type: 'varchar',
    length: 100,
  })
  course!: string;

  @Column({
    type: 'varchar',
    length: 50,
  })
  code!: string;

  @Column({
    type: 'int',
  })
  level!: number;

  @Column({
    type: 'varchar',
    length: 100,
  })
  department!: string;

  @Column({
    type: 'varchar',
    length: 150,
  })
  file!: string;

  @CreateDateColumn({
    type: 'timestamp',
  })
  createdAt!: Date;

  @Column()
  session!: string;
  @Column()
  semester!: string;
}
