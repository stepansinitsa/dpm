import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { User, UserDocument } from '../src/auth/schemas/user.schema';
import { UserService } from '../src/users/services/user.service';

describe('UserService', () => {
  let service: UserService;
  let userModel: Model<UserDocument>;

  const mockUserModel = {
    findById: jest.fn(),
    findOne: jest.fn(),
    find: jest.fn(),
    save: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getModelToken(User.name),
          useValue: mockUserModel,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    userModel = module.get(getModelToken(User.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create()', () => {
    it('должен создать пользователя с хэшированным паролем', async () => {
      const dto = {
        email: 'test@example.com',
        password: 'password123',
        name: 'Test User',
        contactPhone: '+79001234567',
      };

      mockUserModel.save.mockResolvedValue(dto);

      const result = await service.create(dto);
      expect(result.passwordHash).not.toEqual(dto.password);
      expect(mockUserModel.save).toHaveBeenCalled();
    });
  });

  describe('findById()', () => {
    it('должен вернуть пользователя по ID', async () => {
      const user = {
        _id: '1',
        email: 'test@example.com',
        name: 'Test User',
      };
      mockUserModel.findById.mockReturnValueOnce({
        exec: jest.fn().mockResolvedValueOnce(user),
      });

      expect(await service.findById('1')).toEqual(user);
    });
  });

  describe('findByEmail()', () => {
    it('должен вернуть пользователя по email', async () => {
      const user = {
        email: 'test@example.com',
        name: 'Test User',
      };
      mockUserModel.findOne.mockReturnValueOnce({
        exec: jest.fn().mockResolvedValueOnce(user),
      });

      expect(await service.findByEmail('test@example.com')).toEqual(user);
    });
  });

  describe('findAll()', () => {
    it('должен вернуть список пользователей', async () => {
      const users = [
        {
          email: 'user1@example.com',
          name: 'User One',
        },
        {
          email: 'user2@example.com',
          name: 'User Two',
        },
      ];
      mockUserModel.find.mockReturnValueOnce({
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockResolvedValueOnce(users),
      });

      const params = {
        limit: 10,
        offset: 0,
        email: 'user',
        name: 'Test',
        contactPhone: '123',
      };

      expect(await service.findAll(params)).toEqual(users);
    });
  });
});