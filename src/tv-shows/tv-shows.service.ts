
// services/tvshow.service.ts
import { Injectable, HttpStatus, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TVShow, TvshowDocument } from './entities/tv-show.entity';
import { CreateTVShowDto } from './dto/create-tv-show.dto';
import { HttpError } from 'src/errors/custom.errors';

@Injectable()
export class TVShowService {
  private readonly logger = new Logger(TVShowService.name);
  constructor(
    @InjectModel(TVShow.name) private tvShowModel: Model<TvshowDocument>,
  ) {}

  async create(createTVShowDto: CreateTVShowDto) {
    const newTVShow = new this.tvShowModel(createTVShowDto);
    return newTVShow.save();
  }

  async findAll(page: number = 0, pageSize: number = 10) {
    const tvShows = await this.tvShowModel
      .find()
      .sort({ created_at: -1 })
      .skip(page * pageSize)
      .limit(pageSize)
      .lean();

    const total = await this.tvShowModel.countDocuments().lean();
    return { tvShows, total };
  }

  async findOne(id: string) {
    const tvShow = await this.tvShowModel.findById(id).lean();
    if (!tvShow) {
      throw HttpError(HttpStatus.NOT_FOUND, `TV Show with ID ${id} not found`);
    }
    return tvShow;
  }

  async update(id: string, updateTVShowDto: Partial<CreateTVShowDto>) {
    const updatedTVShow = await this.tvShowModel
      .findByIdAndUpdate(id, updateTVShowDto, { new: true })
      .lean();

    if (!updatedTVShow) {
      throw HttpError(HttpStatus.NOT_FOUND, `TV Show with ID ${id} not found`);
    }
    return updatedTVShow;
  }

  async remove(id: string) {
    const deletedTVShow = await this.tvShowModel.findByIdAndDelete(id).lean();
    if (!deletedTVShow) {
      throw HttpError(HttpStatus.NOT_FOUND, `TV Show with ID ${id} not found`);
    }
    return deletedTVShow;
  }
}
