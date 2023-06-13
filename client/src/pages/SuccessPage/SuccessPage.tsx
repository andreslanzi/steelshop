import { useEffect } from 'react';
import emailjs from '@emailjs/browser';
import { useAuthUser } from 'react-auth-kit';
import { useNavigate } from 'react-router-dom';
import { useShoppingCart } from '../../context/ShoppingCartContext';

const SuccessPage = () => {
  const auth = useAuthUser();
  const userEmail = auth()?.email;
  const navigate = useNavigate();

  const { clearCart } = useShoppingCart();

  useEffect(() => {
    const sendEmail = async () => {
      console.log('trying to send it');
      emailjs
        .send(
          'service_cpmu52a',
          'template_jynah62',
          {
            to_name: userEmail,
            from_name: 'Steel Ecommerce',
            message: 'Thanks for your purchase!'
          },
          'hGFDud_rJ5Ms2nfSB'
        )
        .then(
          (result) => {
            console.log(result.text);
          },
          (error) => {
            console.log(error.text);
          }
        );
    };
    sendEmail();
    clearCart();
  }, []);

  return (
    <div className="flex flex-col justify-center align-center items-center mt-16">
      <h1 className="mb-8 text-2xl">Thank you for your purchase!</h1>
      <button
        className="bg-primary px-4 py-2 rounded hover:bg-blue-800"
        onClick={() => navigate('/')}>
        SHOP
      </button>
    </div>
  );
};

export default SuccessPage;
