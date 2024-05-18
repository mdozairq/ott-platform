import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MyListService } from './my-list.service';
import { MyListController } from './my-list.controller';
import { MyList, myListSchema } from './entities/my-list.entity';
import { MyListRepository } from './my-list.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: MyList.name, schema: myListSchema }]),
  ],
  controllers: [MyListController],
  providers: [MyListService, MyListRepository]
})
export class MyListModule {}
