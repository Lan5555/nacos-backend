import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { StudentCourse } from '../../student_courses/entities/student-courses-entities';

@Entity('courses')
export class Course {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 200 })
  name!: string;

  @Column({ length: 20, unique: true })
  code!: string;

  @Column({ length: 10 })
  level!: string;

  @Column({ length: 100 })
  department!: string;
  @Column()
  description!: string;
  @Column({ nullable: true })
  file?: string;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;

  // 🔗 relationship (optional but recommended)
  @OneToMany(() => StudentCourse, (sc) => sc.course)
  studentCourses!: StudentCourse[];
}
