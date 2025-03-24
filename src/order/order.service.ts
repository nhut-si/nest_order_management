import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './order.entity';
import { Product } from '../product/product.entity';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async create(orderData: CreateOrderDto): Promise<Order> {
    if (!orderData.productIds.length) {
      throw new HttpException('Products cannot be empty', HttpStatus.BAD_REQUEST);
    }
    const products = await this.productRepository.findByIds(orderData.productIds);
    if (products.length !== orderData.productIds.length) {
      throw new HttpException('One or more products not found', HttpStatus.NOT_FOUND);
    }
    const totalPrice = products.reduce((sum, p) => sum + p.price, 0);
    const order = this.orderRepository.create({
      customerName: orderData.customerName,
      totalPrice,
      products,
    });
    return this.orderRepository.save(order);
  }

  findById(id: number): Promise<Order> {
    return this.orderRepository.findOneOrFail({ where: { id }, relations: ['products'] });
  }

  findByCustomer(customerName: string): Promise<Order[]> {
    return this.orderRepository.find({ where: { customerName }, relations: ['products'] });
  }

  async cancel(id: number): Promise<void> {
    await this.orderRepository.delete(id);
  }
}