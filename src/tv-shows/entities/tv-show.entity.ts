import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { Genre } from 'src/users/entities/user.entity';


@Schema({ _id: false })
class Episode {
  @Prop({ required: true })
  episodeNumber: number;

  @Prop({ required: true })
  seasonNumber: number;

  @Prop({ required: true, type: Date })
  releaseDate: Date;

  @Prop({ required: true })
  director: string;

  @Prop({ type: [String], required: true })
  actors: string[];
}

const EpisodeSchema = SchemaFactory.createForClass(Episode);

@Schema({
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  versionKey: false,
  collection: 'tvshows',
})
export class TVShow {
  @Prop({ default: uuidv4 })
  _id: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ type: [String], enum: Genre })
  genres: Genre[];

  @Prop({ type: [EpisodeSchema], default: [] })
  episodes: Episode[];
}

export const tvshowCollection = 'tvshows';
export type TvshowDocument = TVShow & Document;
export const tvshowSchema = SchemaFactory.createForClass(TVShow);
