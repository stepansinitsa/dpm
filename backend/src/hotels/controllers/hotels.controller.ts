import {
  Controller,
  Post,
  Param,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { HotelMediaService } from '../services/hotel-media.service';

@Controller('api/admin/hotels/media')
export class HotelMediaController {
  constructor(private readonly hotelMediaService: HotelMediaService) {}

  @Post(':id')
  @UseInterceptors(FilesInterceptor('images', 10))
  async uploadImages(
    @Param('id') id: string,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    const uploaded = await this.hotelMediaService.uploadHotelImages(id, files);
    return { images: uploaded };
  }
}