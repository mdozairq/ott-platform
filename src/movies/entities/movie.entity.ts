import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { Genre } from 'src/users/entities/user.entity';

@Schema({
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  versionKey: false,
  collection: 'movies',
})
export class Movie {
  @Prop({ default: uuidv4 })
  _id: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ type: [String], enum: Genre })
  genres: Genre[];

  @Prop({ required: true, type: Date })
  releaseDate: Date;

  @Prop({ required: true })
  director: string;

  @Prop({ type: [String], required: true })
  actors: string[];
}

export const movieCollection = 'movies';
export type movieDocument = Movie & Document;
export const movieSchema = SchemaFactory.createForClass(Movie);
