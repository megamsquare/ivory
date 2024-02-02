import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Restaurant } from './entities/restaurant.entity';
import { Repository } from 'typeorm';
import {
  CreateRestaurantDto,
  GetRestaurantDto,
  UpdateRestaurantDto,
} from './dto/restaurant.dto';

@Injectable()
export class RestaurantsService {
  constructor(
    @InjectRepository(Restaurant)
    private readonly restaurantRepository: Repository<Restaurant>,
  ) {}

  async create(createRestaurantDto: CreateRestaurantDto) {
    const { name, address } = createRestaurantDto;
    try {
      const existingRestaurant = await this.restaurantRepository.findOne({
        where: { name, address },
      });
      if (existingRestaurant) {
        throw new BadRequestException('Restaurant already exists');
      }
      const restaurant = this.restaurantRepository.create(createRestaurantDto);
      return await this.restaurantRepository.save(restaurant);
    } catch (error) {
      return error;
    }
  }

  async findAll(getRestaurantDto: GetRestaurantDto) {
    try {
      const sql = `
      SELECT 
      rest.name,
      rest.address,
      rest.latitude,
      rest.longitude
    FROM restaurants AS rest
    WHERE
    ST_DWithin(
      ST_MakePoint(rest.longitude, rest.latitude),
      ST_MakePoint(${getRestaurantDto.longitude}, ${getRestaurantDto.latitude}), ${getRestaurantDto.distance})
      AND rest.address LIKE '%${getRestaurantDto.city}%';
    `;
      const results = await this.restaurantRepository.query(sql);
      return results;
    } catch (error) {
      throw new InternalServerErrorException(
        'An error occurred while fetching restaurants',
      );
    }
  }

  async findOne(id: number) {
    const found = await this.restaurantRepository.findOne({ where: { id } });
    if (!found) {
      throw new NotFoundException(`Could not find restaurant with ID "${id}"`);
    }
    return found;
  }

  async update(id: number, updateRestaurantDto: UpdateRestaurantDto) {
    const existingRestaurant = await this.findOne(id);
    if (!existingRestaurant) {
      throw new NotFoundException();
    }
    Object.assign(existingRestaurant, updateRestaurantDto);

    return await this.restaurantRepository.save(existingRestaurant);
  }

  async remove(id: number) {
    const existingRestaurant = await this.findOne(id);
    if (!existingRestaurant) {
      throw new NotFoundException();
    }
    await this.restaurantRepository.remove(existingRestaurant);

    return `restaurant deleted`;
  }
}
