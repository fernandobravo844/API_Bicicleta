import { IsNotEmpty, IsString } from 'class-validator';

export class CreateRentalDto {
    @IsString()
    @IsNotEmpty()
    userId: string;

    @IsString()
    @IsNotEmpty()
    bikeId: string;
}
