import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity('cloudinary_files')
export class CloudinaryFile {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  publicId!: string;

  @Column()
  url!: string;

  @Column()
  secureUrl!: string;

  @Column({ nullable: true })
  format!: string;

  @Column()
  resourceType!: string;

  @CreateDateColumn()
  createdAt!: Date;
}
