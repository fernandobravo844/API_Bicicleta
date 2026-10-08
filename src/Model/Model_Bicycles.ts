export type BicycleStatus = 'disponible' | 'en_uso' | 'mantenimiento';

export interface Bicycle {
    id:string;
    type:string;
    status:BicycleStatus;
    location:string;
}
