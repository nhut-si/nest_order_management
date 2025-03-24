import { InputType, Field, Int } from '@nestjs/graphql';
import { IsString, MinLength, IsArray } from 'class-validator';

@InputType()
export class CreateOrderInput {
  @Field()
  @IsString()
  @MinLength(1)
  customerName: string;

  @Field(() => [Int])
  @IsArray()
  @MinLength(1)
  productIds: number[];
}