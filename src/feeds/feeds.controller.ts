import { Body, Controller, Get, Post } from '@nestjs/common';
import { FeedsService } from './feeds.service';
import { CreateFeedDto } from './dto/create-feed.dto';
import { Feed } from './schemas/feed.schema';

@Controller('feeds')
export class FeedsController {
  constructor(private readonly feedsService: FeedsService) {}

  @Post()
  async create(@Body() createFeedDto: CreateFeedDto) {
    await this.feedsService.create(createFeedDto);
  }

  // @Post('/like')
  // async like(@Body() createFeedDto: CreateFeedDto) {
  //   await this.feedsService.create(createFeedDto);
  // }

  @Get()
  async findAll(): Promise<Feed[]> {
    return this.feedsService.findAll();
  }
}
