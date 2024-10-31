/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Product } from './productSchema';
import axios from 'axios';

@Injectable()
export class ProductsService {
  private apiUrl = 'https://technical-frontend-api.bokokode.com/api/products';

  /**
   * Método para obtener todos los productos desde la API externa con filtros opcionales y paginación.
   * @param filters - Filtros opcionales como categorías y ordenación
   */
  async findAll(filters: any = {}) {
    try {
      // Crear el payload para enviar a la API externa solo con los valores presentes
      const payload: any = {};
      if (filters.page) payload.page = filters.page;
      if (filters.perPage) payload.perPage = filters.perPage; // Añade perPage si es necesario
      if (filters.categories) payload.categories = filters.categories;
      if (filters.sort) payload.sort = filters.sort;

      // Hacer la petición a la API externa
      const response = await axios.post(this.apiUrl, payload, {
        headers: { 'Content-Type': 'application/json' }, // Encabezado opcional
      });

      // Devolver los datos de la respuesta de la API
      return response.data;
    } catch (error) {
      console.error('Error al obtener los productos:', error);
      throw new Error('No se pudo obtener el producto');
    }
  }

  /**
   * Método para encontrar un producto específico por su ID desde la API externa
   * @param id - ID del producto
   */
  async findById(id: string): Promise<Product | undefined> {
    try {
      // Realizar la solicitud para obtener el producto específico
      const response = await axios.get(`${this.apiUrl}/${id}`);
      
      // Debug para revisar la respuesta del producto específico
      console.log('Producto por ID:', response.data);

      return response.data;
    } catch (error) {
      console.error('Error al obtener producto por ID:', error);
      throw new Error('No se pudo obtener el producto');
    }
  }
}
