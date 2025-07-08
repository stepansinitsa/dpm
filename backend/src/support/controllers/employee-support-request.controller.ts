import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';

import { RoleGuard } from '../../auth/guards/role.guard';
import { Role } from '../../auth/enums/roles.enum';
import { ISupportRequestEmployeeService } from '../interfaces/support-request.service.interface';
import { MarkMessagesAsReadDto } from '../dto/mark-messages-as-read.dto';

@Controller('api/manager/support-requests')
@UseGuards(new RoleGuard(Role.MANAGER))
export class ManagerSupportRequestController {
  constructor(private readonly service: ISupportRequestEmployeeService) {}

  @Get(':userId')
  async getChatsByUser(@Param('userId') userId: string) {
    const chats = await this.service.findSupportRequests({ user: userId, limit: 10, offset: 0 });
    const result = await Promise.all(
      chats.map(async chat => ({
        ...chat,
        hasNewMessages: await this.service.getUnreadCountForEmployee(chat.id, userId),
      })),
    );
    return result;
  }

  @Post(':id/messages/read')
  async markRead(
    @Param('id') id: string,
    @Body() dto: MarkMessagesAsReadDto,
  ) {
    return this.service.markMessagesAsRead({
      ...dto,
      supportRequest: id,
    });
  }

  @Delete(':id/close')
  async closeRequest(@Param('id') id: string) {
    return this.service.closeRequest(id);
  }
}