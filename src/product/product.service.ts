import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductService {
    constructor(
      @InjectRepository(Product)
      private productRepository: Repository<Product>,
    ) {}

  findAll(skip: number, take: number): Promise<Product[]> {
    if (skip < 0 || take <= 0) {
      throw new HttpException('Invalid pagination parameters', HttpStatus.BAD_REQUEST);
    }
    return this.productRepository.find({ skip, take });
  }

  create(productDto: CreateProductDto): Promise<Product> {
    if (productDto.price <= 0 || productDto.stock < 0) {
      throw new HttpException('Price must be positive and stock non-negative', HttpStatus.BAD_REQUEST);
    }
    return this.productRepository.save(productDto);
  }

  async update(id: number, productDto: CreateProductDto): Promise<Product> {
    const product = await this.productRepository.findOneOrFail({ where: { id } });
    if (productDto.price <= 0 || productDto.stock < 0) {
      throw new HttpException('Price must be positive and stock non-negative', HttpStatus.BAD_REQUEST);
    }
    return this.productRepository.save({ ...product, ...productDto });
  }
  async delete(id: number): Promise<void> {
    await this.productRepository.delete(id);
  }
}