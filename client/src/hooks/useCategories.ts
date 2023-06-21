import { useQuery } from '@tanstack/react-query';
import { fetchCategories } from '../fetchers/products';
import { Category } from '../types/Product';

const useCategories = () => {
  const { data } = useQuery<Category[]>(['categories'], fetchCategories);
  return data;
};

export default useCategories;
