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
  department!: string;
  @Column()
  position!: string;
  @Column()
  phone!: string;
  @Column()
  createdAt!: Date;
  @Column()
  otp!: string;
  @Column()
  publicId!: string;
  @Column()
  profileImage!: string;
}
