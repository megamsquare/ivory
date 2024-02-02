import { Test, TestingModule } from '@nestjs/testing';
import { RestaurantsService } from './restaurants.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Restaurant } from './entities/restaurant.entity';
import { Repository } from 'typeorm';
import {
  CreateRestaurantDto,
  GetRestaurantDto,
  UpdateRestaurantDto,
} from './dto/restaurant.dto';
import { NotFoundException } from '@nestjs/common';

describe('RestaurantsService', () => {
  let service: RestaurantsService;
  let repository: Repository<Restaurant>;

  const RESTAURANT_REPO_TOKEN = getRepositoryToken(Restaurant);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RestaurantsService,
        {
          provide: RESTAURANT_REPO_TOKEN,
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<RestaurantsService>(RestaurantsService);
    repository = module.get<Repository<Restaurant>>(RESTAURANT_REPO_TOKEN);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });

  describe('create', () => {
    const createRestaurantDto: CreateRestaurantDto = {
      name: 'Cafe Delight',
      address: '123 Main St, New York, NY',
      latitude: 40.7112,
      longitude: -74.0055,
    };

    it('should create a restaurant', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValueOnce(null);
      jest
        .spyOn(repository, 'create')
        .mockReturnValueOnce(createRestaurantDto as any);
      jest
        .spyOn(repository, 'save')
        .mockResolvedValueOnce(createRestaurantDto as any);

      const result = await service.create(createRestaurantDto);
      expect(repository.findOne).toHaveBeenCalledWith({
        where: { name: 'Cafe Delight', address: '123 Main St, New York, NY' },
      });
      expect(repository.create).toHaveBeenCalledWith(createRestaurantDto);
      expect(repository.save).toHaveBeenCalledWith(createRestaurantDto);
      expect(result).toEqual(createRestaurantDto);
    });
  });

  describe('findAll', () => {
    const getRestaurantDto: GetRestaurantDto = {
      latitude: 40.7128,
      longitude: -74.006,
      distance: 1000,
      city: 'New York',
    };

    const mockResults = [
      {
        name: 'Restaurant 1',
        address: 'Address 1',
        latitude: 40.7128,
        longitude: -74.006,
      },
      {
        name: 'Restaurant 2',
        address: 'Address 2',
        latitude: 40.7129,
        longitude: -74.0061,
      },
    ];

    it('should return all restaurants', async () => {
      jest.spyOn(repository, 'query').mockResolvedValueOnce(mockResults);

      const result = await service.findAll(getRestaurantDto);

      expect(repository.query).toHaveBeenCalledWith(expect.any(String));
      expect(result).toEqual(mockResults);
    });
  });

  describe('findOne', () => {
    const mockRestaurant = {
      id: 1,
      name: 'Test Restaurant',
      address: 'Test Address',
      latitude: 40.7128,
      longitude: -74.006,
    };

    it('should return a restaurant by ID', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValueOnce(mockRestaurant);

      const result = await service.findOne(1);

      expect(repository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(result).toEqual(mockRestaurant);
    });

    it('should throw NotFoundException if restaurant is not found', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValueOnce(null);

      await expect(service.findOne(1)).rejects.toThrowError(NotFoundException);
      expect(repository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
    });
  });

  describe('update', () => {
    const updateRestaurantDto: UpdateRestaurantDto = {
      name: 'Updated Restaurant',
      address: 'Updated Address',
      latitude: 40.7129,
      longitude: -74.0061,
    };

    const existingRestaurant = {
      id: 1,
      name: 'Test Restaurant',
      address: 'Test Address',
      latitude: 40.7128,
      longitude: -74.006,
    };

    it('should update a restaurant', async () => {
      jest
        .spyOn(repository, 'findOne')
        .mockResolvedValueOnce(existingRestaurant);
      jest
        .spyOn(repository, 'save')
        .mockResolvedValueOnce(updateRestaurantDto as any);

      const result = await service.update(1, updateRestaurantDto);

      expect(repository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(repository.save).toHaveBeenCalledWith(existingRestaurant);
      expect(result).toEqual(updateRestaurantDto);
    });

    it('should throw NotFoundException if restaurant is not found', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValueOnce(null);

      await expect(
        service.update(1, {} as UpdateRestaurantDto),
      ).rejects.toThrowError(NotFoundException);
      expect(repository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
    });
  });

  describe('remove', () => {
    const existingRestaurant = {
      id: 1,
      name: 'Test Restaurant',
      address: 'Test Address',
      latitude: 40.7128,
      longitude: -74.006,
    };

    it('should remove a restaurant', async () => {
      jest
        .spyOn(repository, 'findOne')
        .mockResolvedValueOnce(existingRestaurant);
      jest.spyOn(repository, 'remove').mockResolvedValueOnce({} as any);

      const result = await service.remove(1);

      expect(repository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(repository.remove).toHaveBeenCalledWith(existingRestaurant);
      expect(result).toEqual('restaurant deleted');
    });

    it('should throw NotFoundException if restaurant is not found', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValueOnce(null);

      await expect(service.remove(1)).rejects.toThrowError(NotFoundException);
      expect(repository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
    });
  });
});
