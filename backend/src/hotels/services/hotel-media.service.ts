import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Hotel, HotelDocument } from '../schemas/hotel.schema';

@Injectable()
export class HotelMediaService {
  constructor(
    @InjectModel(Hotel.name) private hotelModel: Model<HotelDocument>,
  ) {}

  async uploadHotelImages(hotelId: string, files: Express.Multer.File[]) {
    const hotel = await this.hotelModel.findById(hotelId).exec();
    if (!hotel) throw new Error('Гостиница не найдена');

    const imageUrls = files.map(file => file.path);
    hotel.images = [...hotel.images, ...imageUrls];
    await hotel.save();

    return hotel.images;
  }

  async reorderHotelImages(hotelId: string, newOrder: string[]) {
    const hotel = await this.hotelModel.findById(hotelId).exec();
    if (!hotel) throw new Error('Гостиница не найдена');
    if (!hotel.images) hotel.images = [];

    hotel.images = newOrder;
    await hotel.save();

    return hotel.toObject({ versionKey: false });
  }

  async deleteHotelImage(hotelId: string, imageId: string) {
    const hotel = await this.hotelModel.findById(hotelId).exec();
    if (!hotel || !hotel.images) throw new Error('Гостиница или изображение не найдены');

    hotel.images = hotel.images.filter((_, index) => index !== parseInt(imageId));
    await hotel.save();

    return hotel.toObject({ versionKey: false });
  }
}