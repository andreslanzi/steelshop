import axios from 'axios';
import { Product, Category } from '../types/Product';

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

export const fetchCategories = async (): Promise<Category[]> => {
  const response = await axios.get(`http://localhost:5005/api/products`);
  const products: Product[] = response.data;

  let categories: Category[] = [];
  products.map((p) => {
    if (!categories.includes(p.category)) {
      categories.push(p.category);
    }
  });

  return categories;
};
