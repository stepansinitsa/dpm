import { IsString, IsMongoId } from 'class-validator';

export class SendMessageDto {
  /**
   * ID автора сообщения (пользователь или менеджер)
   */
  @IsMongoId()
  author: string;

  /**
   * ID обращения, к которому относится сообщение
   */
  @IsMongoId()
  supportRequest: string;

  /**
   * Текст сообщения
   */
  @IsString()
  text: string;
}