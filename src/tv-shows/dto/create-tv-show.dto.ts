import { IsString, IsDate, IsArray, ArrayNotEmpty, ValidateNested, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';
import { Genre } from 'src/users/entities/user.entity';

class EpisodeDto {
  @IsNumber()
  episodeNumber: number;

  @IsNumber()
  seasonNumber: number;

  @IsDate()
  @Type(() => Date)
  releaseDate: Date;

  @IsString()
  director: string;

  @IsArray()
  @ArrayNotEmpty()
  actors: string[];
}

export class CreateTVShowDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsArray()
  @ArrayNotEmpty()
  genres: Genre[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => EpisodeDto)
  episodes: EpisodeDto[];
}
