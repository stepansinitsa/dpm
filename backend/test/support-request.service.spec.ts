import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { SupportRequest } from '../src/support/schemas/support-request.schema';
import { Message } from '../src/support/schemas/message.schema';
import { SupportRequestService } from '../src/support/services/support-request.service';

describe('SupportRequestService', () => {
  let service: SupportRequestService;
  let supportRequestModel: Model<SupportRequest>;
  let messageModel: Model<Message>;

  const mockSupportRequestModel = {
    create: jest.fn(),
    find: jest.fn(),
    findById: jest.fn(),
    findByIdAndUpdate: jest.fn(),
  };

  const mockMessageModel = {
    create: jest.fn(),
    find: jest.fn(),
    updateMany: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SupportRequestService,
        {
          provide: getModelToken(SupportRequest.name),
          useValue: mockSupportRequestModel,
        },
        {
          provide: getModelToken(Message.name),
          useValue: mockMessageModel,
        },
      ],
    }).compile();

    service = module.get<SupportRequestService>(SupportRequestService);
    supportRequestModel = module.get(getModelToken(SupportRequest.name));
    messageModel = module.get(getModelToken(Message.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createSupportRequest()', () => {
    it('должен создать обращение в поддержку', async () => {
      const dto = {
        user: 'user1',
        text: 'Help me!',
      };
      const request = { id: '1', isActive: true, user: 'user1', messages: [] };

      mockSupportRequestModel.create.mockReturnValue(request);

      expect(await service.createSupportRequest(dto)).toEqual(request);
    });
  });

  describe('sendMessage()', () => {
    it('должен отправить сообщение в чат', async () => {
      const dto = {
        author: 'manager1',
        supportRequest: '1',
        text: 'We will help you!',
      };
      const message = { ...dto, sentAt: new Date() };

      mockMessageModel.create.mockReturnValue(message);

      expect(await service.sendMessage(dto)).toEqual(message);
    });
  });

  describe('markMessagesAsRead()', () => {
    it('должен отметить все непрочитанные сообщения как прочитанные', async () => {
      const dto = {
        user: 'client1',
        supportRequest: '1',
        createdBefore: new Date(),
      };

      mockMessageModel.updateMany.mockReturnValueOnce({
        exec: jest.fn().mockResolvedValue({ modifiedCount: 1 }),
      });

      await service.markMessagesAsRead(dto);
      expect(mockMessageModel.updateMany).toHaveBeenCalled();
    });
  });

  describe('closeRequest()', () => {
    it('должен закрыть чат', async () => {
      mockSupportRequestModel.findByIdAndUpdate.mockReturnValueOnce({
        exec: jest.fn().mockResolvedValue({ isActive: false }),
      });

      await service.closeRequest('1');
      expect(mockSupportRequestModel.findByIdAndUpdate).toHaveBeenCalledWith('1', { isActive: false });
    });
  });

  describe('getUnreadCountForClient()', () => {
    it('должен вернуть количество непрочитанных сообщений от менеджера', async () => {
      mockMessageModel.countDocuments.mockReturnValueOnce(2);

      const count = await service.getUnreadCountForClient('1', 'client1');
      expect(count).toBe(2);
    });
  });
});