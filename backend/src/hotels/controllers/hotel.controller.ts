import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Param,
  Body,
  Query,
  UseGuards
} from '@nestjs/common';

import { RoleGuard } from '../../auth/guards/role.guard';
import { Role } from '../../auth/enums/roles.enum';
import { IHotelService } from '../interfaces/hotel.service.interface';
import { CreateHotelDto } from '../dto/create-hotel.dto';
import { UpdateHotelDto } from '../dto/update-hotel.dto';
import { SearchHotelParams } from '../interfaces/hotel.service.interface';

@Controller('api/admin/hotels')
@UseGuards(new RoleGuard(Role.ADMIN))
export class HotelsController {
  constructor(private readonly hotelService: IHotelService) {}

  /**
   * Добавление новой гостиницы
   */
  @Post()
  async create(@Body() dto: CreateHotelDto) {
    return this.hotelService.create(dto);
  }

  /**
   * Получение списка гостиниц (только для admin)
   */
  @Get()
  async findAll(
    @Query('limit') limit = 10,
    @Query('offset') offset = 0,
    @Query('title') title?: string,
  ) {
    const params: SearchHotelParams = { limit, offset, title };
    return this.hotelService.search(params);
  }

  /**
   * Получение гостиницы по ID
   */
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.hotelService.findById(id);
  }

  /**
   * Обновление информации о гостинице
   */
  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateHotelDto) {
    return this.hotelService.update(id, {
      ...dto,
      description: dto.description || ''
    });
  }

  /**
   * Удаление гостиницы
   */
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.hotelService.remove(id);
  }
}