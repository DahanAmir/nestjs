import { Test, TestingModule } from '@nestjs/testing';
import { FeedsController } from './feeds.controller';
import { CreateFeedDto } from './dto/create-feed.dto';
import { FeedsService } from './feeds.service';

describe('Feeds Controller', () => {
  let controller: FeedsController;
  let service: FeedsService;
  const createFeedDto: CreateFeedDto = {
    name: 'Feed #1',
    breed: 'Breed #1',
    age: 4,
  };

  const mockFeed = {
    name: 'Feed #1',
    breed: 'Breed #1',
    age: 4,
    _id: 'a id',
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
                breed: 'Bread #1',
                age: 4,
              },
              {
                name: 'Feed #2',
                breed: 'Breed #2',
                age: 3,
              },
              {
                name: 'Feed #3',
                breed: 'Breed #3',
                age: 2,
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
          breed: 'Bread #1',
          age: 4,
        },
        {
          name: 'Feed #2',
          breed: 'Breed #2',
          age: 3,
        },
        {
          name: 'Feed #3',
          breed: 'Breed #3',
          age: 2,
        },
      ]);
      expect(service.findAll).toHaveBeenCalled();
    });
  });
});
