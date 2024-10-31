import api from '../utils/api';

export const getProducts = async (filters = {}) => {
  const response = await api.post('/products', {
    ...filters
  });
  return response.data.data;
};

export const getFeaturedProduct = async () => {
  const response = await api.post('/products',{});
  return response.data.data.data[0]; 
};

export const getProductById = async (id) => {
  const response = await api.get(`/products/${id}`);
  return response.data;
};
