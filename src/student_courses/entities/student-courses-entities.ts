import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Unique,
} from 'typeorm';
import { User } from '../../users/entities/user-entities';
import { Course } from '../../courses/entities/course-entites';

@Entity('student_courses')
@Unique(['student', 'course'])
export class StudentCourse {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => User, (user) => user.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'student_id' })
  student!: User;

  @ManyToOne(() => Course, (course) => course.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'course_id' })
  course!: Course;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  enrollment_date!: Date;
}
