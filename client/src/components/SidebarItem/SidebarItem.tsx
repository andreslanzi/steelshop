import { useShoppingCart } from '../../context/ShoppingCartContext';
import { CartItem } from '../../types/CartItem';

type SidebarItemProps = {
  item: CartItem;
};

const SidebarItem = ({ item }: SidebarItemProps) => {
  const { decreaseCartQuantity, increaseCartQuantity } = useShoppingCart();
  return (
    <div className="flex flex-inline justify-between align-center items-center m-auto mb-2">
      <div className="flex flex-col justify-center items-center align-center text-center w-full">
        <div className="flex flex-inline justify-center items-center align-center mb-[4px]">
          <div className="flex justify-center algin-center items-center">
            <button
              className="bg-primary hover:bg-blue-800 px-2 rounded mr-2"
              onClick={() => {
                decreaseCartQuantity(item._id ?? '');
              }}>
              -
            </button>
          </div>
          <div className="text-lg">{item.quantity}</div>
          <div>
            <button
              className="bg-primary hover:bg-blue-800 px-2 rounded ml-2"
              onClick={() => {
                increaseCartQuantity(item._id ?? '');
              }}>
              +
            </button>
          </div>
        </div>
        <h2 className="whitespace-nowrap text-sm">$ {item.price}</h2>
      </div>
      <div className="w-full align-center m-auto flex justify-center algin-center items-center h-[120px]">
        <img src={item.thumbnail} alt="product" className="max-w-[120px] " />
      </div>
      <div className="w-full align-center m-auto flex justify-center algin-center items-center leading-[52px]">
        <span>$ {item.quantity * Number(item.price)}</span>
      </div>
    </div>
  );
};

export default SidebarItem;
