/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MyList } from './entities/my-list.entity';

@Injectable()
export class MyListRepository {
    constructor(
        @InjectModel(MyList.name) public myListModel: Model<MyList>
    ) { }
}
