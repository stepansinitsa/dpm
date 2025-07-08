import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { HotelMediaController } from './controllers/hotels.controller';
import { HotelService } from './services/hotel.service';
import multerConfig from './multer.config';

@Module({
  imports: [
    MulterModule.register(multerConfig),
  ],
  controllers: [HotelMediaController],
  providers: [HotelService],
})
export class HotelsModule {}