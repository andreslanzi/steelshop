import { useShoppingCart } from '../context/ShoppingCartContext';
import useProducts from '../hooks/useProducts';
import { Product } from '../types/Product';

export const checkStock = (productId: string) => {
  const { getItemQuantity } = useShoppingCart();
  const products = useProducts();
  if (products) {
    const productStock = products.find((product: Product) => product._id === productId)?.stock || 0;
    const productQuantity = getItemQuantity(productId);
    return !!(productStock >= productQuantity + 1);
  }
  return 0;
};

export const randomRgbColor = () => {
  const r = Math.floor(Math.random() * 256); // Random between 0-255
  const g = Math.floor(Math.random() * 256); // Random between 0-255
  const b = Math.floor(Math.random() * 256); // Random between 0-255
  return 'rgb(' + r + ',' + g + ',' + b + ')';
};
