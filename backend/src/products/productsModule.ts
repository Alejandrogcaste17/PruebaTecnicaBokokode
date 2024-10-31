/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ProductsController } from './productController';
import { ProductsService } from './productService';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}

