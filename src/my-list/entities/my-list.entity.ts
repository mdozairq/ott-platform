import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

@Schema({ _id: false })
class MyListItem {
  @Prop({ required: true })
  contentId: string;

  @Prop({ required: true, enum: ['Movie', 'TVShow'] })
  contentType: 'Movie' | 'TVShow';
}


@Schema({
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  versionKey: false,
  collection: 'my_lists',
})
export class MyList {
  @Prop({ default: uuidv4 })
  _id: string;

  @Prop({ type: mongoose.Schema.Types.String, ref: 'User', required: true, unique: true })
  userId: string;

  @Prop({ type: [MyListItem], default: [], unique: true })
  items: MyListItem[];
}

export const myListCollection = 'my_lists';
export type myListDocument = MyList & Document;
export const myListSchema = SchemaFactory.createForClass(MyList);
