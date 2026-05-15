import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('student_notifications')
export class StudentNotification {
  @PrimaryGeneratedColumn()
  id!: number;
  @Column()
  mat_no!: string;
  @Column()
  title!: string;
  @Column()
  message!: string;
  @Column()
  isRead!: boolean;
  @Column()
  createdAt!: Date;
}
