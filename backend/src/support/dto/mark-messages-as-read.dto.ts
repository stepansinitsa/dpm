import { IsString, IsDate } from 'class-validator';

export class MarkMessagesAsReadDto {
  /**
   * ID пользователя, который помечает сообщения как прочитанные
   */
  @IsString()
  user: string;

  /**
   * ID чата (обращения)
   */
  @IsString()
  supportRequest: string;

  /**
   * Дата и время до которой нужно отметить сообщения как прочитанные
   */
  @IsDate()
  createdBefore: Date;
}