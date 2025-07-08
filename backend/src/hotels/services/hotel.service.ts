import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Hotel, HotelDocument } from '../schemas/hotel.schema';
import { IHotelService, SearchHotelParams, UpdateHotelParams } from '../interfaces/hotel.service.interface';

@Injectable()
export class HotelService implements IHotelService {
  constructor(
    @InjectModel(Hotel.name) private hotelModel: Model<HotelDocument>,
  ) {}

  async create(data: any): Promise<Hotel> {
    const created = new this.hotelModel(data);
    return created.save();
  }

  async findById(id: string): Promise<Hotel> {
    return this.hotelModel.findById(id).exec();
  }

  async search(params: SearchHotelParams): Promise<Hotel[]> {
    const query: any = {};
    if (params.title) {
      query.title = { $regex: params.title, $options: 'i' };
    }
    return this.hotelModel.find(query).limit(params.limit).skip(params.offset).exec();
  }

  async update(id: string, data: UpdateHotelParams): Promise<Hotel> {
    return this.hotelModel.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  async remove(id: string): Promise<void> {
    await this.hotelModel.findByIdAndDelete(id).exec();
  }
}