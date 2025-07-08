import { IsString } from 'class-validator';

export class CreateSupportRequestDto {
  /**
   * ID пользователя, создающего обращение
   */
  @IsString()
  user: string;

  /**
   * Текст первого сообщения в чате
   */
  @IsString()
  text: string;
}