import { useShoppingCart } from '../../context/ShoppingCartContext';
import { Link } from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from '../../components/CheckoutForm';
import { useState } from 'react';
import { StripeElementsOptions, loadStripe } from '@stripe/stripe-js';
import BeatLoader from 'react-spinners/BeatLoader';
import Modal from 'react-modal';
import CartItemCard from '../../components/CartItemCard/CartItemCard';

const CartPage = () => {
  const { cartItems, getCartTotalPrice } = useShoppingCart();
  const [clientSecret, setClientSecret] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };

  const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');

  const createStripePayment = () => {
    openModal();
    setIsLoading(true);
    fetch('http://localhost:5005/api/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items: [{ id: 'xl-tshirt', price: 250 }] })
    })
      .then((res) => res.json())
      .then((data) => {
        setIsLoading(false);
        setClientSecret(data.clientSecret);
      });
  };

  const appearance = {
    theme: 'night'
  };
  const options = {
    clientSecret,
    appearance
  };

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      background: 'black'
    }
  };

  if (cartItems.filter((item) => item.quantity > 0).length === 0) {
    return (
      <div className="flex flex-col justify-center align-center items-center h-screen">
        <h1 className="text-[30px] mb-8">No items in your cart</h1>
        <Link
          to="/"
          className="bg-blue-900 px-4 py-2 rounded hover:bg-blue-700 text-white-600 font-medium">
          Shop Now
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center align-center content-center py-8 px-4 ">
      {cartItems
        .filter((item) => item.quantity > 0)
        .map((p) => (
          <CartItemCard product={p} key={p._id} />
        ))}
      <hr className="border-solid border-blue-900 w-[70%] mt-8 mb-8" />
      <div className="md:inline-flex md:flex-row flex-col flex justify-between align-center items-center px-8 py-4 w-[80%] font-semibold">
        <h1>Total</h1>
        <span>${getCartTotalPrice()}.00</span>
      </div>
      <button
        onClick={() => createStripePayment()}
        className="bg-primary px-4 py-2 rounded hover:bg-blue-800">
        {!isLoading && !clientSecret ? (
          'PAY NOW'
        ) : (
          <BeatLoader
            color="#ffffff"
            loading={isLoading}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        )}
      </button>
      {clientSecret && (
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal">
          <Elements options={options as StripeElementsOptions} stripe={stripePromise}>
            <CheckoutForm />
          </Elements>
        </Modal>
      )}
    </div>
  );
};

export default CartPage;
