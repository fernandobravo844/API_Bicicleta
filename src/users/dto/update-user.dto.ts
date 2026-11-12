import { IsEmail, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

// Todos los campos son opcionales para permitir actualizaciones parciales
export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  lastname?: string;

  @IsOptional()
  @IsEmail()
  email?: string;
}
