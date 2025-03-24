import { Controller, Get, Post, Put, Delete, Body, UseGuards, Query, Param } from '@nestjs/common';
import { ProductService } from './product/product.service';
import { CreateProductDto } from './product/dto/create-product.dto';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  findAll(@Query('page') page: number = 1, @Query('limit') limit: number = 10) {
    return this.productService.findAll((page - 1) * limit, limit);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() updateProductDto: CreateProductDto) {
    return this.productService.update(+id, updateProductDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  delete(@Param('id') id: string) {
    return this.productService.delete(+id);
  }
}