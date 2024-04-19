import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity('event')
export class EventEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @Column()
  type: string;

  @Column()
  name: string;

  @Column('json')
  payload: Record<string, any>;
}
