import { Body, Controller, Get, Post } from '@nestjs/common';
import { FeedsService } from './feeds.service';
import { CreateFeedDto } from './dto/create-feed.dto';
import { Feed } from './schemas/feed.schema';
import { Param } from '@nestjs/common';
import { Types } from 'mongoose';

@Controller('feeds')
export class FeedsController {
  constructor(private readonly feedsService: FeedsService) {}

  @Post()
  async create(@Body() createFeedDto: CreateFeedDto): Promise<void> {
    await this.feedsService.create(createFeedDto);
  }

  @Post('/like/:id')
  async like(@Param('id') id: Types.ObjectId): Promise<Feed> {
    return await this.feedsService.addLike(id);
  }

  @Get()
  async findAll(): Promise<Feed[]> {
    return this.feedsService.findAll();
  }
}
