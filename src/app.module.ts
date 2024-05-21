/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { HealthModule } from './health/health.module';
import { MongooseModule } from '@nestjs/mongoose';
import { APP_GUARD } from '@nestjs/core';
import { Configs } from './config/config';
import { RolesGuard } from './role/role-guard';
import { JwtModule } from '@nestjs/jwt';
import { jwtFactory } from './jwt/auth.jwt';
import { UsersModule } from './users/users.module';
import { MovieModule } from './movies/movies.module';
import { TVShowModule } from './tv-shows/tv-shows.module';
import { MyListModule } from './my-list/my-list.module';


@Module({
  imports: [
    MongooseModule.forRoot(Configs().databases.mongo_db.url),
    JwtModule.registerAsync(jwtFactory),
    HealthModule,
    UsersModule,
    MovieModule,
    TVShowModule,
    MyListModule
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule { }
