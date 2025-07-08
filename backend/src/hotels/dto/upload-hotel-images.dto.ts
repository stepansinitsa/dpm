import { IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class UploadHotelImagesDto {
  @IsArray()
  images: string[];
}