import axios from 'axios';
import { Product } from '../types/Product';

export const fetchProducts = async (): Promise<Product[]> => {
  const response = await axios.get('http://localhost:5005/api/products');
  const products = response.data;
  return products;
};

export const fetchProductDetails = async (productId: string): Promise<Product> => {
  const response = await axios.get(`http://localhost:5005/api/details/${productId}`);
  const product = response.data;
  return product;
};
