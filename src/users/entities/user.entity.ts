import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid'; // Adjust the path as necessary


export enum Genre {
    Action = 'Action',
    Comedy = 'Comedy',
    Drama = 'Drama',
    Fantasy = 'Fantasy',
    Horror = 'Horror',
    Romance = 'Romance',
    SciFi = 'SciFi',
}


@Schema({ _id: false })
class WatchHistoryItem {
  @Prop({ required: true })
  contentId: string;

  @Prop({ required: true, type: Date })
  watchedOn: Date;

  @Prop({ type: Number })
  rating?: number;
}

const WatchHistoryItemSchema = SchemaFactory.createForClass(WatchHistoryItem);

@Schema({
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  versionKey: false,
  collection: 'users',
})
export class User {
  @Prop({ default: uuidv4 })
  _id: string;

  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;


  @Prop({ type: [String], enum: Genre })
  favoriteGenres: Genre[];

  @Prop({ type: [String], enum: Genre })
  dislikedGenres: Genre[];

  @Prop({ type: [WatchHistoryItemSchema], default: [] })
  watchHistory: WatchHistoryItem[];
}

export const userCollection = 'users';
export type userDocument = User & Document;
export const userSchema = SchemaFactory.createForClass(User);
