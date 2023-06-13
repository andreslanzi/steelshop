import { useShoppingCart } from '../../context/ShoppingCartContext';
import { CartItem } from '../../types/CartItem';

type CartItemCard = {
  product: CartItem;
};

const CartItemCard = (props: CartItemCard) => {
  const { product } = props;
  const { increaseCartQuantity, decreaseCartQuantity, removeFromCart } = useShoppingCart();
  return (
    <>
      <div className="md:inline-flex md:flex-row flex-col flex justify-between align-center items-center px-8 py-4 w-[80%]">
        <div className="">
          <img
            src={product.thumbnail}
            alt="product"
            className="lg:max-w-[200px] max-w-[200px] h-auto"
          />
        </div>
        <span className="w-[320px] text-left ">{product.title}</span>
        <div className="flex flex-inline ">
          <button
            className="mr-4 bg-primary hover:bg-blue-800 px-2 rounded"
            onClick={() => {
              decreaseCartQuantity(product._id ?? '');
            }}>
            -
          </button>
          {product.quantity}
          <button
            className="ml-4 bg-primary hover:bg-blue-800 px-2 rounded"
            onClick={() => {
              increaseCartQuantity(product._id ?? '');
            }}>
            +
          </button>
        </div>
        <button
          className="bg-red-900 px-4 py-2 rounded hover:bg-red-700 text-white-600 font-medium"
          onClick={() => {
            removeFromCart(product._id ?? '');
          }}>
          X
        </button>
      </div>
    </>
  );
};

export default CartItemCard;
