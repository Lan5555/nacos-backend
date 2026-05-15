import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('notifications')
export class RegularNotification {
  @PrimaryGeneratedColumn()
  id!: number;
  @Column()
  title!: string;
  @Column()
  message!: string;
  @Column()
  isRead!: boolean;
  @Column()
  createdAt!: Date;
}
