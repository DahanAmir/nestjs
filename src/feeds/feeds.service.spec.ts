import { Test, TestingModule } from '@nestjs/testing';
import { FeedsService } from './feeds.service';
import { getModelToken } from '@nestjs/mongoose';
import { Feed } from './schemas/feed.schema';
import { Model } from 'mongoose';
import { CreateFeedDto } from './dto/create-feed.dto';

const mockFeed = {
  name: 'Feed #1',
};

describe('FeedsService', () => {
  let service: FeedsService;
  let model: Model<Feed>;

  const feedsArray = [
    {
      name: 'Feed #1',
      likes: '1',
    },
    {
      name: 'Feed #2',
      likes: '2',
    },
    {
      name: 'Feed #3',
      likes: '3',
    },
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FeedsService,
        {
          provide: getModelToken('Feed'),
          useValue: {
            new: jest.fn().mockResolvedValue(mockFeed),
            constructor: jest.fn().mockResolvedValue(mockFeed),
            find: jest.fn(),
            create: jest.fn(),
            exec: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<FeedsService>(FeedsService);
    model = module.get<Model<Feed>>(getModelToken('Feed'));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all feeds', async () => {
    jest.spyOn(model, 'find').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce(feedsArray),
    } as any);
    const feeds = await service.findAll();
    expect(feeds).toEqual(feedsArray);
  });

  it('should insert a new feed', async () => {
    jest.spyOn(model, 'create').mockImplementationOnce(() =>
      Promise.resolve({
        name: 'Feed #1',
      }),
    );
    const createFeedDto: CreateFeedDto = {
      name: 'Feed #1',
    };

    const newFeed = await service.create(createFeedDto);
    expect(newFeed).toEqual(mockFeed);
  });
});
