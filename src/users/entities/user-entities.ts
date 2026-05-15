import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id!: number;
  @Column({ unique: true })
  mat_no!: string;
  @Column()
  name!: string;
  @Column({ unique: true })
  email!: string;
  @Column()
  password!: string;
  @Column()
  department!: string;
  @Column()
  phone!: string;
  @Column()
  level!: string;
  @Column()
  isAdmin!: boolean;
  @Column()
  createdAt!: Date;
  @Column()
  otp!: string;
}
