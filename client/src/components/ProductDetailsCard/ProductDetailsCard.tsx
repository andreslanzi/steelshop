import { Link } from 'react-router-dom';
import { Tilt } from 'react-tilt';
import { useShoppingCart } from '../../context/ShoppingCartContext';
import { Product } from '../../types/Product';

type ProductDetailsCardProps = {
  product: Product;
  isNew?: boolean;
};

const ProductDetailsCard = ({ product, isNew }: ProductDetailsCardProps) => {
  const { getItemQuantity, increaseCartQuantity, decreaseCartQuantity, removeFromCart } =
    useShoppingCart();

  const checkStock = (productId: string) => {
    const productQuantity = getItemQuantity(productId);
    return !!(product.stock >= productQuantity + 1);
  };

  const quantity = getItemQuantity(product._id ?? '');
  return (
    <>
      <div className="flex flex-col items-center align-center content-center xl:w-[50%] w-[85%] m-auto py-8">
        <div className="text-center px-16">
          {product.title && (
            <h1 className="font-semibold text-xl underline underline-offset-8 decoration-blue-600 mb-8">
              {product.title}
            </h1>
          )}
          {product.description && (
            <h3 className="font-light text-md rounded p-4">{product.description}</h3>
          )}
        </div>
        {/* <div className="inline-flex flex-row px-8 py-8 justify-between gap-6">
          <div className="flex flex-col justify-between items-center align-center text-center">
            {product.brand && (
              <div className="w-[70px] whitespace-nowrap">
                <h3 className="font-semibold text-blue-200">Brand</h3>
                <h3 className="text-clip overflow-hidden">{product.brand}</h3>
              </div>
            )}
            {product.price && (
              <div className="w-[70px] whitespace-nowrap">
                <h3 className="font-semibold text-blue-200">Price</h3>
                <h3 className="text-clip overflow-hidden">${product.price}</h3>
              </div>
            )}
            {product.stock > 0 && isNew && (
              <div className="w-[70px] whitespace-nowrap">
                <h3 className="font-semibold text-blue-200">Stock</h3>
                <h3 className="text-clip overflow-hidden">{product.stock}</h3>
              </div>
            )}
          </div> */}
        <div className="flex flex-inline ">
          <div className="flex flex-inline justify-center align-center items-center">
            <div>
              {product.thumbnail && (
                <Tilt>
                  <div className="max-w-[450px] ">
                    <img src={product.thumbnail} alt="productImage" />
                  </div>
                </Tilt>
              )}
            </div>

            <div className="bg-primary rounded-xl w-full md:w-[250px] py-4">
              <h1 className="text-center font-bold text-xl">Product Info</h1>
              <div className="grid grid-cols-2 md:gap-8 gap-2 justify-center justify-items-center md:px-8 px-0 py-4 text-center">
                {product.rating > 0 && (
                  <div className="w-[70px] whitespace-nowrap">
                    <h3 className="font-semibold text-blue-200">Rating</h3>
                    <h3 className="text-clip overflow-hidden">{product.rating}</h3>{' '}
                  </div>
                )}
                {product.discountPercentage > 0 && isNew && (
                  <div className="w-[70px] whitespace-nowrap">
                    <h3 className="font-semibold text-blue-200">Discount</h3>
                    <h3 className="text-clip overflow-hidden">{product.discountPercentage}%</h3>
                  </div>
                )}
                {product.category && (
                  <div className="w-[70px] whitespace-nowrap">
                    <h3 className="font-semibold text-blue-200">Category</h3>
                    <h3 className="text-clip overflow-hidden">{product.category}</h3>
                  </div>
                )}
                {product.brand && (
                  <div className="w-[70px] whitespace-nowrap">
                    <h3 className="font-semibold text-blue-200">Brand</h3>
                    <h3 className="text-clip overflow-hidden">{product.brand}</h3>
                  </div>
                )}
                {product.price && (
                  <div className="w-[70px] whitespace-nowrap">
                    <h3 className="font-semibold text-blue-200">Price</h3>
                    <h3 className="text-clip overflow-hidden">${product.price}</h3>
                  </div>
                )}
                {product.stock > 0 && isNew && (
                  <div className="w-[70px] whitespace-nowrap">
                    <h3 className="font-semibold text-blue-200">Stock</h3>
                    <h3 className="text-clip overflow-hidden">{product.stock}</h3>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* <div className="flex flex-col justify-between items-center align-center text-center">
            {product.rating > 0 && (
              <div className="w-[70px] whitespace-nowrap">
                <h3 className="font-semibold text-blue-200">Rating</h3>
                <h3 className="text-clip overflow-hidden">{product.rating}</h3>
              </div>
            )}
            {product.discountPercentage > 0 && isNew && (
              <div className="w-[70px] whitespace-nowrap">
                <h3 className="font-semibold text-blue-200">Discount</h3>
                <h3 className="text-clip overflow-hidden">{product.discountPercentage}%</h3>
              </div>
            )}
            {product.category && (
              <div className="w-[70px] whitespace-nowrap">
                <h3 className="font-semibold text-blue-200">Category</h3>
                <h3 className="text-clip overflow-hidden">{product.category}</h3>
              </div>
            )}
          </div> */}
        {/* </div> */}
        {!isNew && (
          <div className="flex flex-col items-center align-center justify-center m-auto py-8 min-h-[160px] w-full">
            {quantity === 0 ? (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  increaseCartQuantity(product._id ?? '');
                }}
                className="bg-primary p-2 mt-4 rounded hover:bg-blue-800 hover:text-white-100 text-white-600 font-medium">
                ADD TO CART
              </button>
            ) : (
              <>
                <div className="flex flex-inline">
                  <button
                    className="mr-4 bg-primary hover:bg-red-800 px-2 rounded text-lg text-center justify-center items-center align-center"
                    onClick={(e) => {
                      e.preventDefault();
                      decreaseCartQuantity(product._id ?? '');
                    }}>
                    <span className="text-xl">-</span>
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
                    <span className="text-xl">+</span>
                  </button>
                </div>
                <div className="mt-6 flex flex-inline w-full justify-center align-center items-center">
                  <Link
                    className="bg-blue-900 p-2 rounded hover:bg-blue-800 text-white-600 font-medium h-[100%]"
                    to="/cart">
                    Checkout
                  </Link>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default ProductDetailsCard;
