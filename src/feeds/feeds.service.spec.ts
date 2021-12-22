import { Test, TestingModule } from '@nestjs/testing';
import { FeedsService } from './feeds.service';
import { getModelToken } from '@nestjs/mongoose';
import { Feed } from './schemas/feed.schema';
import { Model } from 'mongoose';

const mockFeed = {
  name: 'Feed #1',
  breed: 'Breed #1',
  age: 4,
};

describe('FeedsService', () => {
  let service: FeedsService;
  let model: Model<Feed>;

  const catsArray = [
    {
      name: 'Feed #1',
      breed: 'Breed #1',
      age: 4,
    },
    {
      name: 'Feed #2',
      breed: 'Breed #2',
      age: 2,
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

  it('should return all cats', async () => {
    jest.spyOn(model, 'find').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce(catsArray),
    } as any);
    const cats = await service.findAll();
    expect(cats).toEqual(catsArray);
  });

  it('should insert a new cat', async () => {
    jest.spyOn(model, 'create').mockImplementationOnce(() =>
      Promise.resolve({
        name: 'Feed #1',
        breed: 'Breed #1',
        age: 4,
      }),
    );
    const newFeed = await service.create({
      name: 'Feed #1',
      breed: 'Breed #1',
      age: 4,
    });
    expect(newFeed).toEqual(mockFeed);
  });
});
