import { Link } from 'react-router-dom';
import { Tilt } from 'react-tilt';
import { useShoppingCart } from '../../context/ShoppingCartContext';
import { checkStock } from '../../utils/utils';
import { Product } from '../../types/Product';

type ProductCardProps = {
  product: Product;
};

const ProductCard = ({ product }: ProductCardProps) => {
  const { getItemQuantity, increaseCartQuantity, decreaseCartQuantity } = useShoppingCart();

  const quantity = getItemQuantity(product._id ?? '');

  return (
    <div>
      <div className="w-full h-full py-8 px-8 flex flex-col items-center text-center object-contain justify-between">
        <Link
          to={`/details/${product._id}`}
          className="flex justify-center align-center items-center m-auto object-contain"
          key={product._id}>
          <Tilt className="h-[300px] w-[320px] flex justify-center items-center align-center mb-8">
            <img
              src={product.thumbnail}
              alt="product"
              style={{
                width: 'auto',
                maxWidth: '300px',
                height: 'auto',
                maxHeight: '250px',
                filter: `drop-shadow(0 0 2rem #6e6b63)`
              }}
            />
          </Tilt>
        </Link>

        <div className="mb-4">
          <h4 className="mb-8">{product.title}</h4>
          <h4>$ {product.price}</h4>
        </div>
        <div className="min-h-[70px] flex flex-col justify-center align-center items-center">
          {quantity === 0 && (
            <button
              onClick={(e) => {
                e.preventDefault();
                increaseCartQuantity(product._id ?? '');
              }}
              className="bg-primary p-2 mt-4 rounded hover:bg-blue-800 hover:text-white-100 text-white-600 font-medium">
              ADD TO CART
            </button>
          )}
          {quantity !== 0 && (
            <div className="flex flex-inline justify-center align-center items-center m-auto">
              <button
                className="mr-4 bg-primary hover:bg-blue-800 px-2 rounded"
                onClick={(e) => {
                  e.preventDefault();
                  decreaseCartQuantity(product._id ?? '');
                }}>
                -
              </button>
              <span className="text-xl">{quantity}</span>
              <button
                className={`ml-4 bg-primary hover:bg-blue-800 px-2 rounded ${
                  !checkStock(product._id ?? '')
                    ? 'bg-gray-800 hover:bg-gray-800 cursor-pointer'
                    : ''
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  increaseCartQuantity(product._id ?? '');
                }}
                disabled={!checkStock(product._id ?? '')}>
                +
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
