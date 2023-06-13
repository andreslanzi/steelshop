import './Sidebar.scss';
import { useShoppingCart } from '../../context/ShoppingCartContext';
import { useNavigate } from 'react-router-dom';
import SidebarItem from '../SidebarItem';
import { useEffect } from 'react';

type SidebarProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const Sidebar = ({ isOpen, setIsOpen }: SidebarProps) => {
  const { cartItems, getCartTotalPrice } = useShoppingCart();

  const navigate = useNavigate();

  useEffect(() => {
    if (cartItems.length === 0) {
      setIsOpen(false);
    }
  }, [cartItems]);

  return (
    <div
      id="customScroll"
      className={
        isOpen
          ? 'sidenav active flex flex-col justify-start align-center items-center px-2 py-2 overflow-auto lg:w-[30%] w-[100%]'
          : 'sidenav px-4'
      }>
      <div className="flex flex-inline justify-end align-center items-center w-full mb-4 cursor-pointer">
        <i
          className="fas fa-close bg-red-800 text-xl px-2 py-1 rounded"
          onClick={() => setIsOpen(false)}
        />
      </div>

      <div className="w-full">
        {cartItems
          .filter((i) => i.quantity > 0)
          .map((item) => (
            <SidebarItem item={item} key={item._id} />
          ))}
      </div>
      <hr className="border-solid border-blue-800 w-[70%] mt-8 mb-8" />
      <div className="inline-flex flex-row  flex justify-between align-center items-center  w-[70%] font-semibold">
        <h1>Total</h1> <span>${getCartTotalPrice()}.00</span>
      </div>
      <button
        onClick={() => {
          setIsOpen(!isOpen);
          navigate('./cart');
        }}
        className="bg-blue-900 py-2 px-4 rounded font-semibold hover:bg-blue-700">
        Checkout
      </button>
    </div>
  );
};

export default Sidebar;
