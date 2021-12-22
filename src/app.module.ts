import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FeedsModule } from './feeds/feeds.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/cyberproof'),
    FeedsModule,
  ],
})
export class AppModule {}
