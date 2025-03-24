import { IsString, IsArray, MinLength } from 'class-validator';

export class CreateOrderDto {
  @IsString()
  @MinLength(1)
  customerName: string;

  @IsArray()
  @MinLength(1)
  productIds: number[];
}