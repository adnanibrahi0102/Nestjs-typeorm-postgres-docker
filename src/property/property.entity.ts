import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Property {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ default: false })
  isVerified: boolean;

  @Column()
  price: number;
}
