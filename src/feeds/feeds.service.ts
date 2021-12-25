import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateFeedDto } from './dto/create-feed.dto';
import { Feed, FeedDocument } from './schemas/feed.schema';

@Injectable()
export class FeedsService {
  constructor(
    @InjectModel(Feed.name) private readonly feedModel: Model<FeedDocument>,
  ) {}

  async create(createFeedDto: CreateFeedDto): Promise<Feed> {
    const createdFeed = await this.feedModel.create(createFeedDto);

    return createdFeed;
  }

  async addLike(id: Types.ObjectId): Promise<Feed> {
    const updatedFeed = await this.feedModel.findByIdAndUpdate(id, {
      $inc: { likes: 1 },
      
    });

    return updatedFeed;
  }

  async unLike(id: Types.ObjectId): Promise<Feed> {
    const updatedFeed = await this.feedModel.findByIdAndUpdate(id, {
      $inc: { likes: -1 },
    });
    return updatedFeed;
  }



  async findAll(): Promise<Feed[]> {
    return this.feedModel.find().exec();
  }
}
