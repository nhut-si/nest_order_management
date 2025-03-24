import { InputType, Field, Float, Int } from '@nestjs/graphql';
import { IsString, Length, IsNumber, Min } from 'class-validator';

@InputType()
export class CreateProductInput {
  @Field()
  @IsString()
  @Length(3, 100)
  name: string;

  @Field(() => Float)
  @IsNumber()
  @Min(0.01)
  price: number;

  @Field(() => Int)
  @IsNumber()
  @Min(0)
  stock: number;
}