import { SupportRequest } from '../schemas/support-request.schema';
import { Message } from '../schemas/message.schema';

export interface CreateSupportRequestDto {
  user: string;
  text: string;
}

export interface SendMessageDto {
  author: string;
  supportRequest: string;
  text: string;
}

export interface MarkMessagesAsReadDto {
  user: string;
  supportRequest: string;
  createdBefore: Date;
}

export interface GetChatListParams {
  limit: number;
  offset: number;
  isActive?: boolean;
  user?: string;
}

export interface ISupportRequestService {
  findSupportRequests(params: GetChatListParams): Promise<SupportRequest[]>;
  sendMessage(dto: SendMessageDto): Promise<Message>;
  getMessages(supportRequestId: string): Promise<Message[]>;
  markMessagesAsRead(dto: MarkMessagesAsReadDto): Promise<void>;
  closeRequest(id: string): Promise<void>;
}

export interface ISupportRequestClientService extends ISupportRequestService {
  createSupportRequest(dto: CreateSupportRequestDto): Promise<SupportRequest>;
  getUnreadCountForClient(supportRequestId: string, clientId: string): Promise<number>;
}

export interface ISupportRequestEmployeeService extends ISupportRequestService {
  getUnreadCountForEmployee(supportRequestId: string, employeeId: string): Promise<number>;
}