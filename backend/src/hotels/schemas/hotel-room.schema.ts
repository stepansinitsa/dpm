import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class HotelRoom extends Document {
  @Prop({ required: true, type: Types.ObjectId })
  hotel: Types.ObjectId;

  @Prop({ trim: true })
  description?: string;

  @Prop({ type: [String], default: [] })
  images: string[];

  @Prop({ required: true, default: true })
  isEnabled: boolean;
}

export const HotelRoomSchema = SchemaFactory.createForClass(HotelRoom);
export type HotelRoomDocument = HotelRoom & Document;