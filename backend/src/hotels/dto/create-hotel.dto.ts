import { IsString, MinLength } from 'class-validator';

export class CreateHotelDto {
  @IsString()
  @MinLength(5)
  title: string;

  @IsString()
  @MinLength(100)
  description?: string;
}