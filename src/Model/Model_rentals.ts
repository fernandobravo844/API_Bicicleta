export interface Rental {
  id: number;
  userId: number;
  bikeId: number;
  startTime: Date;
  endTime?: Date;
  totalCost?: number;
  status: 'activo' | 'finalizado';
}