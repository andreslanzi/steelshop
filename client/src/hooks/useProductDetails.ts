/* eslint-disable no-unused-vars */
import { useQuery } from '@tanstack/react-query';
import { fetchProductDetails } from '../fetchers/products';
import { Product } from '../types/Product';

const useProductDetails = (productId: string) => {
  const { data } = useQuery<Product>([productId], () => fetchProductDetails(productId), {
    staleTime: 6000
  });
  return { product: data };
};

export default useProductDetails;
