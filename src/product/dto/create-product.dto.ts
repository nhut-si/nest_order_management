import { IsString, Length, IsNumber, Min } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @Length(3, 100)
  name: string;

  @IsNumber()
  @Min(0.01)
  price: number;

  @IsNumber()
  @Min(0)
  stock: number;
}