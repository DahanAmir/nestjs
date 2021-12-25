import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type FeedDocument = Feed & Document;

@Schema({ timestamps: true })
export class Feed {
  _id: Types.ObjectId;

  @Prop()
  name: string;

  @Prop({ default: 0 })
  likes: number;
}

export const FeedSchema = SchemaFactory.createForClass(Feed);
