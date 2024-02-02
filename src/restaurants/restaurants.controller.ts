import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';
import {
  CreateRestaurantDto,
  GetRestaurantDto,
  UpdateRestaurantDto,
} from './dto/restaurant.dto';

@Controller({ version: '1' })
export class RestaurantsController {
  constructor(private readonly restaurantsService: RestaurantsService) {}

  @Post('restaurant')
  create(@Body() createRestaurantDto: CreateRestaurantDto) {
    return this.restaurantsService.create(createRestaurantDto);
  }

  @Get('restaurants')
  async findAll(
    @Query('city') city: string,
    @Query('latitude') latitude: number,
    @Query('longitude') longitude: number,
    @Query('distance') distance: number,
  ) {
    if (
      !city ||
      isNaN(latitude) ||
      isNaN(longitude) ||
      isNaN(distance) ||
      distance < 0
    ) {
      throw new BadRequestException('Invalid parameters');
    }
    const getRestaurantDto: GetRestaurantDto = {
      distance,
      city,
      latitude,
      longitude,
    };

    const restaurants = await this.restaurantsService.findAll(getRestaurantDto);
    if (restaurants.length === 0) {
      throw new NotFoundException('No restaurants found');
    }

    return { restaurants };
  }

  @Get('/restaurant/:id')
  findOne(@Param('id') id: string) {
    return this.restaurantsService.findOne(+id);
  }

  @Patch('/restaurant/:id')
  update(
    @Param('id') id: string,
    @Body() updateRestaurantDto: UpdateRestaurantDto,
  ) {
    return this.restaurantsService.update(+id, updateRestaurantDto);
  }

  @Delete('/restaurant/:id')
  remove(@Param('id') id: string) {
    return this.restaurantsService.remove(+id);
  }
}
