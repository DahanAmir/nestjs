import { Test, TestingModule } from '@nestjs/testing';
import { FeedsController } from './feeds.controller';
import { CreateFeedDto } from './dto/create-feed.dto';
import { FeedsService } from './feeds.service';
import { Types } from 'mongoose';
import { Feed } from './schemas/feed.schema';

describe('Feeds Controller', () => {
  let controller: FeedsController;
  let service: FeedsService;
  const createFeedDto: CreateFeedDto = {
    name: 'Feed #1',
  };

  const mockFeed: Feed = {
    _id: new Types.ObjectId('61c3a8af26e3a0fbcb528820'),
    name: 'Feed #1',
    likes: 12,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FeedsController],
      providers: [
        {
          provide: FeedsService,
          useValue: {
            findAll: jest.fn().mockResolvedValue([
              {
                name: 'Feed #1',
              },
              {
                name: 'Feed #2',
              },
              {
                name: 'Feed #3',
              },
            ]),
            create: jest.fn().mockResolvedValue(createFeedDto),
          },
        },
      ],
    }).compile();

    controller = module.get<FeedsController>(FeedsController);
    service = module.get<FeedsService>(FeedsService);
  });

  describe('create()', () => {
    it('should create a new feed', async () => {
      const createSpy = jest
        .spyOn(service, 'create')
        .mockResolvedValueOnce(mockFeed);

      await controller.create(createFeedDto);
      expect(createSpy).toHaveBeenCalledWith(createFeedDto);
    });
  });

  describe('findAll()', () => {
    it('should return an array of feeds', async () => {
      expect(controller.findAll()).resolves.toEqual([
        {
          name: 'Feed #1',
        },
        {
          name: 'Feed #2',
        },
        {
          name: 'Feed #3',
        },
      ]);
      expect(service.findAll).toHaveBeenCalled();
    });
  });
});
