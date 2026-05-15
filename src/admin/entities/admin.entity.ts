import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('admin')
export class Admin {
  @PrimaryGeneratedColumn()
  id!: number;
  @Column()
  name!: string;
  @Column({ unique: true })
  email!: string;
  @Column()
  password!: string;
  @Column({ default: false })
  isStaff!: boolean;
  @Column()
  level!: number;
  @Column()
  createdAt!: Date;
  @Column()
  otp!: string;
}
