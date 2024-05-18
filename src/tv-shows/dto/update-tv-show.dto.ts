import { PartialType } from '@nestjs/swagger';
import { CreateTVShowDto } from './create-tv-show.dto';

export class UpdateTvShowDto extends PartialType(CreateTVShowDto) {}
