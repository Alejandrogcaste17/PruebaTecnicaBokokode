/* eslint-disable prettier/prettier */
import { Controller, Post, Body, Param, Get } from '@nestjs/common';
import { ProductsService } from './productService';
import { GetProductsDto } from './productDto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  /**
   * Endpoint para obtener productos con soporte para filtros de categoria y paginación
   * @param filters - Filtros opcionales como categorías y ordenación
   */
  @Post()
  async getProducts(@Body() filters: GetProductsDto) {
    return await this.productsService.findAll(filters);
  }

  /**
   * Endpoint para obtener un producto específico por su ID
   * @param id - ID del producto
   */
  @Get(':id')
  async getProductById(@Param('id') id: string) {
    return await this.productsService.findById(id);
  }
}


