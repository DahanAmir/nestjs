import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateFeedDto } from './dto/create-feed.dto';
import { Feed, FeedDocument } from './schemas/feed.schema';

@Injectable()
export class FeedsService {
  constructor(
    @InjectModel(Feed.name) private readonly catModel: Model<FeedDocument>,
  ) {}

  async create(createFeedDto: CreateFeedDto): Promise<Feed> {
    const createdFeed = await this.catModel.create(createFeedDto);
    return createdFeed;
  }

  async findAll(): Promise<Feed[]> {
    return this.catModel.find().exec();
  }
}
