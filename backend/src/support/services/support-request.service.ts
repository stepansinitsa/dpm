import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  SupportRequest,
  SupportRequestDocument,
} from '../schemas/support-request.schema';
import { Message, MessageDocument } from '../schemas/message.schema';
import { CreateSupportRequestDto } from '../dto/create-support-request.dto';
import {
  MarkMessagesAsReadDto,
  GetChatListParams,
  SendMessageDto,
} from '../dto/send-message.dto.ts';

@Injectable()
export class SupportRequestService implements ISupportRequestService {
  constructor(
    @InjectModel(SupportRequest.name)
    private supportRequestModel: Model<SupportRequestDocument>,
    @InjectModel(Message.name) private messageModel: Model<MessageDocument>,
  ) {}

  async findSupportRequests(params: GetChatListParams): Promise<SupportRequest[]> {
    return this.supportRequestModel.find(params).exec();
  }

  async sendMessage(dto: SendMessageDto): Promise<Message> {
    const message = new this.messageModel({
      ...dto,
      sentAt: new Date(),
    });
    await message.save();

    const request = await this.supportRequestModel.findById(dto.supportRequest).exec();
    if (!request) throw new NotFoundException('Обращение не найдено');

    request.messages.push(message._id);
    await request.save();

    return message.toObject();
  }

  async getMessages(supportRequestId: string): Promise<Message[]> {
    return this.messageModel.find({ supportRequest: supportRequestId }).exec();
  }

  async markMessagesAsRead(dto: MarkMessagesAsReadDto): Promise<void> {
    await this.messageModel.updateMany(
      {
        supportRequest: dto.supportRequest,
        author: { $ne: dto.user },
        readAt: null,
        sentAt: { $lt: dto.createdBefore },
      },
      { readAt: new Date() },
    ).exec();
  }

  async closeRequest(id: string): Promise<void> {
    await this.supportRequestModel.findByIdAndUpdate(id, { isActive: false }).exec();
  }

  async hasNewMessagesForClient(
    supportRequest: SupportRequest,
    clientId: string,
  ): Promise<boolean> {
    const count = await this.messageModel.countDocuments({
      supportRequest: supportRequest.id,
      author: { $ne: clientId },
      readAt: null,
    }).exec();

    return count > 0;
  }

  async hasNewMessagesForManager(
    supportRequest: SupportRequest,
    managerId: string,
  ): Promise<boolean> {
    const count = await this.messageModel.countDocuments({
      supportRequest: supportRequest.id,
      author: supportRequest.user,
      readAt: null,
    }).exec();

    return count > 0;
  }
}