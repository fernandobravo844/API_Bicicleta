import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export const BICYCLE_STATUSES = ['disponible', 'en_uso', 'mantenimiento'] as const;
export type BicycleStatus = (typeof BICYCLE_STATUSES)[number];

@Entity()
export class Bicycle {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  type: string;

  @Column({ type: 'enum', enum: BICYCLE_STATUSES, default: 'disponible' })
  status: BicycleStatus;

  @Column()
  location: string;
}