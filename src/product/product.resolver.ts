import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ProductService } from './product.service';
import { Product } from './product.entity';
import { CreateProductInput } from './dto/create-product.input';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Resolver(() => Product)
export class ProductResolver {
  constructor(private productService: ProductService) {}

  @Query(() => [Product])
  products() {
    return this.productService.findAll(0, 10);
  }

  @Mutation(() => Product)
  @UseGuards(JwtAuthGuard)
  createProduct(@Args('input') input: CreateProductInput) {
    return this.productService.create(input);
  }
}