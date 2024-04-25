import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Flavor } from './flavors.entity';
import { Exclude } from 'class-transformer';

@Entity({ name: 'coffee' })
export class Coffee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  brand: string;

  @JoinTable()
  @ManyToMany((type) => Flavor, (flavor) => flavor.coffees, { cascade: true })
  flavors: Flavor[];

  @Column({ default: 0 })
  recommendation: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
