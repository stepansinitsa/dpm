import {
  Controller,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { RoleGuard } from '../../auth/guards/role.guard';
import { Role } from '../../auth/enums/roles.enum';
import { HotelMediaService } from '../services/hotel-media.service';

@Controller('api/admin/hotels/media')
@UseGuards(new RoleGuard(Role.ADMIN))
export class HotelMediaController {
  constructor(private readonly hotelMediaService: HotelMediaService) {}

  /**
   * Загрузка изображений для конкретной гостиницы
   */
  @Post(':id')
  @UseInterceptors(FilesInterceptor('images', 10))
  async uploadImages(
    @Param('id') id: string,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    const uploaded = await this.hotelMediaService.uploadHotelImages(id, files);
    return { images: uploaded };
  }

  /**
   * Обновление порядка изображений (перетаскивание)
   */
  @Put(':id/images/reorder')
  async reorderImages(
    @Param('id') id: string,
    @Body('newOrder') newOrder: string[],
  ) {
    return this.hotelMediaService.reorderHotelImages(id, newOrder);
  }

  /**
   * Удаление одного изображения по URL или ID
   */
  @Delete(':id/images/:imageId')
  async deleteImage(@Param('id') id: string, @Param('imageId') imageId: string) {
    return this.hotelMediaService.deleteHotelImage(id, imageId);
  }
}