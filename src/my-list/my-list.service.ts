import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MyList, myListDocument } from './entities/my-list.entity';
import { AddToListDto } from './dto/add-to-list.dto';
import { HttpError } from 'src/errors/custom.errors';

@Injectable()
export class MyListService {
  private readonly logger = new Logger(MyListService.name);
  constructor(
    @InjectModel(MyList.name) private myListModel: Model<myListDocument>
  ) {}

  async addToList(addToListDto: AddToListDto, user_id: string) {
    const { contentId, contentType } = addToListDto;
    const userId = user_id; 
    let userMyList = await this.myListModel.findOne({ userId });

    if (!userMyList) {
      userMyList = new this.myListModel({
        userId,
        items: [{ contentId, contentType }],
      });
    } else {
      const itemExists = userMyList.items.some(item => item.contentId === contentId);
      if (itemExists) {
        throw HttpError(HttpStatus.CONFLICT, 'Item already exists in the list');
      }
      userMyList.items.push({ contentId, contentType });
    }

    return userMyList.save();
  }

  async removeFromList(contentId: string, user_id: string) {
    const userId = user_id

    const userMyList = await this.myListModel.findOne({ userId });
    if (!userMyList) {
      throw HttpError(HttpStatus.NOT_FOUND, 'List not found');
    }

    const itemIndex = userMyList.items.findIndex(item => item.contentId === contentId);
    if (itemIndex === -1) {
      throw HttpError(HttpStatus.NOT_FOUND, 'Item not found in the list');
    }

    userMyList.items.splice(itemIndex, 1);
    return userMyList.save();
  }

  async listMyItems(page: number = 0, pageSize: number = 10) {
    const userId = 'some-user-id'; // Replace with the actual user ID from the authentication context

    const userMyList = await this.myListModel.findOne({ userId }).lean();
    if (!userMyList) {
      return [];
    }

    const items = userMyList.items.slice(page * pageSize, (page + 1) * pageSize);
    return { items, total: userMyList.items.length };
  }
}
