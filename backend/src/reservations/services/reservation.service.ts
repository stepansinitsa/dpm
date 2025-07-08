import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Reservation, ReservationDocument } from '../schemas/reservation.schema';
import { ReservationDto, IReservationService, ReservationSearchOptions } from '../interfaces/reservation.service.interface';

@Injectable()
export class ReservationService implements IReservationService {
  constructor(
    @InjectModel(Reservation.name) private reservationModel: Model<ReservationDocument>,
  ) {}

  async addReservation(dto: ReservationDto): Promise<Reservation> {
    const existing = await this.isRoomAvailable(dto.roomId, dto.dateStart, dto.dateEnd);
    if (!existing) {
      throw new Error('Номер занят на указанные даты');
    }

    const created = new this.reservationModel(dto);
    return created.save();
  }

  async removeReservation(id: string): Promise<void> {
    await this.reservationModel.findByIdAndDelete(id).exec();
  }

  async getReservations(filter: ReservationSearchOptions): Promise<Reservation[]> {
    return this.reservationModel.find(filter).exec();
  }

  async isRoomAvailable(roomId: string, dateStart: Date, dateEnd: Date): Promise<boolean> {
    const count = await this.reservationModel.countDocuments({
      roomId,
      $or: [
        { dateStart: { $lt: dateEnd }, dateEnd: { $gt: dateStart } },
        { dateStart: { $gte: dateStart }, dateEnd: { $lte: dateEnd } },
      ],
    }).exec();

    return count === 0;
  }
}