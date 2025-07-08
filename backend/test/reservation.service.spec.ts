import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Reservation, ReservationDocument } from '../src/reservations/schemas/reservation.schema';
import { ReservationService } from '../src/reservations/services/reservation.service';

describe('ReservationService', () => {
  let service: ReservationService;
  let reservationModel: Model<ReservationDocument>;

  const mockReservationModel = {
    create: jest.fn(),
    find: jest.fn(),
    findById: jest.fn(),
    findByIdAndDelete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReservationService,
        {
          provide: getModelToken(Reservation.name),
          useValue: mockReservationModel,
        },
      ],
    }).compile();

    service = module.get<ReservationService>(ReservationService);
    reservationModel = module.get(getModelToken(Reservation.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('addReservation()', () => {
    it('должен создать бронь', async () => {
      const dto = {
        userId: 'user1',
        hotelId: 'hotel1',
        roomId: 'room1',
        dateStart: new Date(),
        dateEnd: new Date(new Date().setDate(new Date().getDate() + 1)),
      };

      const createdReservation = { ...dto, _id: '1' };
      mockReservationModel.create.mockReturnValue(createdReservation);

      expect(await service.addReservation(dto)).toEqual(createdReservation);
    });

    it('не должен позволить забронировать занятое время', async () => {
      const dto = {
        userId: 'user1',
        hotelId: 'hotel1',
        roomId: 'room1',
        dateStart: new Date('2024-04-01'),
        dateEnd: new Date('2024-04-10'),
      };

      // Предположим, что в базе уже есть такая бронь
      mockReservationModel.countDocuments = jest.fn().mockResolvedValue(1);

      try {
        await service.isRoomAvailable(dto.roomId, dto.dateStart, dto.dateEnd);
      } catch (error) {
        expect(error.message).toBe('Номер занят на указанные даты');
      }
    });
  });

  describe('getReservations()', () => {
    it('должен вернуть список броней', async () => {
      const reservations = [
        {
          userId: 'user1',
          hotelId: 'hotel1',
          roomId: 'room1',
          dateStart: new Date(),
          dateEnd: new Date(),
        },
      ];

      mockReservationModel.find.mockReturnValueOnce({
        exec: jest.fn().mockResolvedValue(reservations),
      });

      expect(await service.getReservations({ userId: 'user1' })).toEqual(reservations);
    });
  });

  describe('removeReservation()', () => {
    it('должен удалить бронь по ID', async () => {
      mockReservationModel.findByIdAndDelete.mockReturnValueOnce({
        exec: jest.fn().mockResolvedValue(undefined),
      });

      await service.removeReservation('1');
      expect(mockReservationModel.findByIdAndDelete).toHaveBeenCalledWith('1');
    });
  });
});