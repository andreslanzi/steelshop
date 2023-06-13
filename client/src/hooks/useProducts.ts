import { useQuery } from '@tanstack/react-query';
import { fetchProducts } from '../fetchers/products';
import { Product } from '../types/Product';

const useProducts = () => {
  const { data } = useQuery<Product[]>(['products'], fetchProducts);

  return data;
};

export default useProducts;
