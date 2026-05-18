import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('contact')
export class Contact {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    type: 'varchar',
    length: 255,
  })
  address!: string;

  @Column({
    type: 'varchar',
    length: 50,
  })
  phone!: string;

  @Column({
    type: 'varchar',
    length: 50,
    unique: true,
  })
  email!: string;

  @Column({
    type: 'varchar',
    length: 100,
  })
  hours!: string;
}
