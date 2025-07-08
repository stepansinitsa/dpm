import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Message {
  @Prop({ required: true, type: Types.ObjectId })
  author: Types.ObjectId;

  @Prop({ required: true, type: Types.ObjectId })
  supportRequest: Types.ObjectId;

  @Prop({ required: true })
  text: string;

  @Prop()
  readAt?: Date;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
export type MessageDocument = Message & Document;