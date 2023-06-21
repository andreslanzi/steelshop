import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchProducts } from '../fetchers/products';
import { Product } from '../types/Product';
import axios from 'axios';

const useProducts = () => {
  const { data } = useQuery<Product[]>(['products'], fetchProducts);
  return data;
};

export const useEditProducts = (editedProduct: Product) => {
  const queryClient = useQueryClient();

  return useMutation<{ editedProduct: Product }, Error>(
    () => axios.put('http://localhost:5005/api/products/edit', editedProduct),

    {
      onSuccess: (_result) => {
        queryClient.invalidateQueries(['products']);
      }
    }
  );
};

export const useDeleteProductsById = (idsToDelete: string[]) => {
  const queryClient = useQueryClient();

  return useMutation<{ idsToDelete: string[] }, Error>(
    () => axios.delete('http://localhost:5005/api/products/delete', { data: { idsToDelete } }),

    {
      onSuccess: (_result) => {
        queryClient.invalidateQueries(['products']);
      }
    }
  );
};

export default useProducts;
