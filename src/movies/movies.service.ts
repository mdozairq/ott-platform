// services/movie.service.ts
import { Injectable, HttpStatus, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Movie, movieDocument } from './entities/movie.entity';
import { CreateMovieDto } from './dto/create-movie.dto';
import { HttpError } from 'src/errors/custom.errors';

@Injectable()
export class MovieService {
  private readonly logger = new Logger(MovieService.name);
  constructor(
    @InjectModel(Movie.name) private movieModel: Model<movieDocument>,
  ) {}

  async create(createMovieDto: CreateMovieDto) {
    const newMovie = new this.movieModel(createMovieDto);
    return newMovie.save();
  }

  async findAll(page: number = 0, pageSize: number = 10) {
    const movies = await this.movieModel
      .find()
      .sort({ created_at: -1 })
      .skip(page * pageSize)
      .limit(pageSize)
      .lean();

    const total = await this.movieModel.countDocuments().lean();
    return { movies, total };
  }

  async findOne(id: string) {
    const movie = await this.movieModel.findById(id).lean();
    if (!movie) {
      throw HttpError(HttpStatus.NOT_FOUND, `Movie with ID ${id} not found`);
    }
    return movie;
  }

  async update(id: string, updateMovieDto: Partial<CreateMovieDto>) {
    const updatedMovie = await this.movieModel
      .findByIdAndUpdate(id, updateMovieDto, { new: true })
      .lean();

    if (!updatedMovie) {
      throw HttpError(HttpStatus.NOT_FOUND, `Movie with ID ${id} not found`);
    }
    return updatedMovie;
  }

  async remove(id: string) {
    const deletedMovie = await this.movieModel.findByIdAndDelete(id).lean();
    if (!deletedMovie) {
      throw HttpError(HttpStatus.NOT_FOUND, `Movie with ID ${id} not found`);
    }
    return deletedMovie;
  }
}
