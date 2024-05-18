// tvshow.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TVShowService } from './tv-shows.service';
import { TVShowController } from './tv-shows.controller';
import { TVShow, tvshowSchema} from './entities/tv-show.entity';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: TVShow.name, schema: tvshowSchema }]),
  ],
  controllers: [TVShowController],
  providers: [TVShowService],
})
export class TVShowModule {}
