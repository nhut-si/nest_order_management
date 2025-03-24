import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { OrderResolver } from './order.resolver';
import { Order } from './order.entity';
import { ProductModule } from '../product/product.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order]),
    ProductModule,
  ],
  providers: [OrderService, OrderResolver],
  controllers: [OrderController],
})
export class OrderModule {}