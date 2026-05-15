import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('marketplace')
export class Marketplace {
  @PrimaryGeneratedColumn()
  id!: number;
  @Column()
  name!: string;
  @Column()
  description!: string;
  @Column('decimal', { precision: 12, scale: 2 })
  price!: number;
  @Column()
  stock!: number;
  @Column()
  sellerName!: string;
  @Column()
  sellerPhone!: string;
  @CreateDateColumn()
  createdAt!: Date;
}
