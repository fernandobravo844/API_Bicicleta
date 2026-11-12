import { IsNotEmpty, IsString } from 'class-validator';

// Decoradores necesarios: con el ValidationPipe global (whitelist) los campos sin decorar se rechazan
export class CreateRentalDto {
    @IsString()
    @IsNotEmpty()
    userId: string;

    @IsString()
    @IsNotEmpty()
    bikeId: string;
}
