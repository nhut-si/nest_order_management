import { Controller, Post, Get, Delete, Param, UseGuards, Body } from '@nestjs/common';
import { OrderService } from './order.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateOrderDto } from './dto/create-order.dto';

@Controller('orders')
@UseGuards(JwtAuthGuard)
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  create(@Body() orderData: CreateOrderDto) {
    return this.orderService.create(orderData);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderService.findById(+id);
  }

  @Get('customer/:customerName')
  findByCustomer(@Param('customerName') customerName: string) {
    return this.orderService.findByCustomer(customerName);
  }

  @Delete(':id')
  cancel(@Param('id') id: string) {
    return this.orderService.cancel(+id);
  }
}