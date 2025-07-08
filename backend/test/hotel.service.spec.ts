import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Hotel, HotelDocument } from '../src/hotels/schemas/hotel.schema';
import { HotelService } from '../src/hotels/services/hotel.service';

describe('HotelService', () => {
  let service: HotelService;
  let hotelModel: Model<HotelDocument>;

  const mockHotelModel = {
    create: jest.fn(),
    findById: jest.fn(),
    find: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    findByIdAndDelete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HotelService,
        {
          provide: getModelToken(Hotel.name),
          useValue: mockHotelModel,
        },
      ],
    }).compile();

    service = module.get<HotelService>(HotelService);
    hotelModel = module.get(getModelToken(Hotel.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create()', () => {
    it('должен создать гостиницу', async () => {
      const dto = { title: 'Test Hotel', description: 'Great hotel' };
      const createdHotel = { ...dto, _id: '1', createdAt: new Date(), updatedAt: new Date() };

      mockHotelModel.create.mockReturnValue(createdHotel);

      expect(await service.create(dto)).toEqual(createdHotel);
      expect(mockHotelModel.create).toHaveBeenCalledWith(dto);
    });
  });

  describe('findById()', () => {
    it('должен вернуть гостиницу по ID', async () => {
      const hotel = { _id: '1', title: 'Test Hotel' };
      mockHotelModel.findById.mockReturnValueOnce({
        exec: jest.fn().mockResolvedValue(hotel),
      });

      expect(await service.findById('1')).toEqual(hotel);
    });
  });

  describe('search()', () => {
    it('должен искать гостиницы по названию', async () => {
      const hotels = [{ title: 'Test Hotel' }];
      mockHotelModel.find.mockReturnValueOnce({
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockResolvedValue(hotels),
      });

      const result = await service.search({ title: 'Test' });
      expect(result).toHaveLength(1);
      expect(result[0].title).toBe('Test Hotel');
    });
  });

  describe('update()', () => {
    it('должен обновить гостиницу', async () => {
      const updatedHotel = { title: 'Updated Hotel' };
      mockHotelModel.findByIdAndUpdate.mockReturnValueOnce({
        exec: jest.fn().mockResolvedValue(updatedHotel),
      });

      expect(await service.update('1', { title: 'Updated Hotel' })).toEqual(updatedHotel);
    });
  });

  describe('remove()', () => {
    it('должен удалить гостиницу', async () => {
      mockHotelModel.findByIdAndDelete.mockReturnValueOnce({
        exec: jest.fn().mockResolvedValue(undefined),
      });

      await service.remove('1');
      expect(mockHotelModel.findByIdAndDelete).toHaveBeenCalledWith('1');
    });
  });
});