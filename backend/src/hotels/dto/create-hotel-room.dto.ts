import { IsString, IsBoolean, IsOptional } from 'class-validator';

export class CreateHotelRoomDto {
  @IsString()
  hotelId: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString({ each: true })
  @IsOptional()
  images?: string[];

  @IsBoolean()
  @IsOptional()
  isEnabled: boolean;
}