import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { OrderService } from './order.service';
import { Order } from './order.entity';
import { CreateOrderInput } from './dto/create-order.input';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Resolver(() => Order)
export class OrderResolver {
  constructor(private orderService: OrderService) {}

  @Query(() => Order)
  @UseGuards(JwtAuthGuard)
  order(@Args('id', { type: () => Int }) id: number) {
    return this.orderService.findById(id);
  }

  @Query(() => [Order])
  @UseGuards(JwtAuthGuard)
  ordersByCustomer(@Args('customerName') customerName: string) {
    return this.orderService.findByCustomer(customerName);
  }

  @Mutation(() => Order)
  @UseGuards(JwtAuthGuard)
  createOrder(@Args('input') input: CreateOrderInput) {
    return this.orderService.create(input);
  }
}