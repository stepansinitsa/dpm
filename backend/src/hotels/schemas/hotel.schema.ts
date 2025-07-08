import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Hotel {
  @Prop({ required: true, trim: true })
  title: string;

  @Prop({ trim: true })
  description?: string;

  @Prop({
    type: [String],
    default: [],
  })
  images: string[];
}

export const HotelSchema = SchemaFactory.createForClass(Hotel);
export type HotelDocument = Hotel & Document;