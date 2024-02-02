import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsLatitude,
  IsLongitude,
  IsNotEmpty,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateRestaurantDto {
  @ApiProperty({ default: 'Cafe Delight' })
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(150)
  name: string;

  @ApiProperty({ default: '123 Main St, New York, NY' })
  @IsNotEmpty()
  address: string;

  @ApiProperty({ default: 40.7112 })
  @IsNotEmpty()
  @IsLatitude()
  latitude: number;

  @ApiProperty({ default: -74.0055 })
  @IsNotEmpty()
  @IsLongitude()
  longitude: number;
}
export class UpdateRestaurantDto extends PartialType(CreateRestaurantDto) {}
export class GetRestaurantDto {
  @ApiProperty({ default: 1000 })
  distance: number;

  @ApiProperty({ default: 'New York' })
  city: string;

  @ApiProperty({ default: 40.7128 })
  @IsNotEmpty()
  @IsLatitude()
  latitude: number;

  @ApiProperty({ default: -74.006 })
  @IsNotEmpty()
  @IsLongitude()
  longitude: number;
}
