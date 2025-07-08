import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class SupportRequest {
  @Prop({ required: true, type: Types.ObjectId })
  user: Types.ObjectId;

  @Prop({ default: true })
  isActive: boolean;

@Prop({ type: [{ type: Types.ObjectId, ref: 'Message' }] })
  messages: Types.ObjectId[];
}

export const SupportRequestSchema = SchemaFactory.createForClass(SupportRequest);
export type SupportRequestDocument = SupportRequest & Document;