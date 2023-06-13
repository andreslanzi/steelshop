import { ReactNode, createContext, useContext } from 'react';
import { CartItem } from '../types/CartItem';
import { useLocalStorage } from '../hooks/useLocalStorage';

type ShoppingCartProps = {
  children: ReactNode;
};

type ShoppingCartContextProps = {
  getTotalQuantity: () => number;
  getItemQuantity: (id: string) => number;
  increaseCartQuantity: (id: string) => void;
  decreaseCartQuantity: (id: string) => void;
  removeFromCart: (id: string) => void;
  getCartTotalPrice: () => number;
  cartItems: CartItem[];
  clearCart: () => void;
};

const ShoppingCartContext = createContext({} as ShoppingCartContextProps);

export const useShoppingCart = () => {
  return useContext(ShoppingCartContext);
};

export const ShoppingCartProvider = ({ children }: ShoppingCartProps) => {
  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>('shopping-cart', []);

  const getTotalQuantity = () => {
    let total = 0;
    cartItems.forEach((item) => (total += item.quantity));
    return total;
  };

  const getItemQuantity = (id: string) => {
    return cartItems.find((item) => item._id === id)?.quantity || 0;
  };

  const increaseCartQuantity = async (id: string) => {
    const productInfo = await fetch(`http://localhost:5005/api/details/${id}`)
      .then((res) => res.json())
      .then((productDet) => productDet);

    setCartItems((currItems) => {
      if (currItems.find((item) => item._id === id) == null) {
        return [...currItems, { ...productInfo, quantity: 1 }];
      } else {
        return currItems.map((item) => {
          if (item._id === id) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        });
      }
    });
  };

  const decreaseCartQuantity = (id: string) => {
    setCartItems((currItems) => {
      if (currItems.find((item) => item._id === id && item.quantity === 1)) {
        return currItems.filter((item) => item._id !== id);
      } else {
        return currItems.map((item) => {
          if (item._id === id) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        });
      }
    });
  };

  const removeFromCart = (id: string) => {
    setCartItems((currItems) => {
      return currItems.filter((item) => item._id !== id);
    });
  };

  const getCartTotalPrice = () => {
    return cartItems.reduce((acc, current) => acc + current.quantity * Number(current.price), 0);
  };

  const clearCart = () => {
    return setCartItems([]);
  };

  return (
    <ShoppingCartContext.Provider
      value={{
        getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart,
        getTotalQuantity,
        getCartTotalPrice,
        cartItems,
        clearCart
      }}>
      {children}
    </ShoppingCartContext.Provider>
  );
};
