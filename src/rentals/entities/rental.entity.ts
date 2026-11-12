import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity.js';
import { Bicycle } from '../../bicycles/entities/bicycle.entity.js';

export const RENTAL_STATUSES = ['activo', 'finalizado'] as const;
export type RentalStatus = (typeof RENTAL_STATUSES)[number];

@Entity('rentals')
export class Rental {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  userId: string;

  @ManyToOne(() => User, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({ type: 'uuid' })
  bikeId: string;

  @ManyToOne(() => Bicycle, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'bikeId' })
  bike: Bicycle;

  @Column({ type: 'timestamptz' })
  startTime: Date;

  @Column({ type: 'timestamptz', nullable: true })
  endTime: Date | null;

  @Column({ type: 'int', nullable: true })
  totalCost: number | null;

  @Column({ type: 'enum', enum: RENTAL_STATUSES, default: 'activo' })
  status: RentalStatus;
}