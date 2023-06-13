import { useEffect, useState } from 'react';
import {
  PaymentElement,
  LinkAuthenticationElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js';
import BeatLoader from 'react-spinners/BeatLoader';
import { StripePaymentElementOptions } from '@stripe/stripe-js';

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();

  // eslint-disable-next-line no-unused-vars
  // const [email, setEmail] = useState<string>('');
  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      'payment_intent_client_secret'
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent?.status) {
        case 'succeeded':
          setMessage('Payment succeeded!');
          break;
        case 'processing':
          setMessage('Your payment is processing.');
          break;
        case 'requires_payment_method':
          setMessage('Your payment was not successful, please try again.');
          break;
        default:
          setMessage('Something went wrong.');
          break;
      }
    });
  }, [stripe]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      setIsDisabled(true);
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: 'http://localhost:3000/payment_success'
      }
    });
    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error.type === 'card_error' || error.type === 'validation_error') {
      setMessage(error.message || 'Error !');
    } else {
      setMessage('An unexpected error occurred.');
      setIsLoading(false);
    }
  };

  const paymentElementOptions: StripePaymentElementOptions = {
    layout: 'tabs'
  };

  return (
    <>
      <form id="payment-form" onSubmit={(e) => handleSubmit(e)}>
        <LinkAuthenticationElement
          id="link-authentication-element"
          // onChange={(e) => {
          //   setEmail(e.value.email);
          // }}
        />
        <PaymentElement id="payment-element" options={paymentElementOptions} />
        {/* Show any error or success messages */}
        {message && <div id="payment-message">{message}</div>}
        <div className="flex flex-col justify-center items-center align-center mt-6 ">
          {/* <div className="w-full flex flex-inline align-center items-center mb-6">
            <label htmlFor="email-receipt" className="text-[16px] text-center mr-4">
              Email me with purchase details
            </label>
            <input type="checkbox" name="email-receipt" className="text-right" />
          </div> */}

          <button
            disabled={isDisabled || isLoading || !stripe || !elements}
            id="submit"
            style={{
              backgroundColor: '#30313d',
              padding: '0.75rem',
              borderRadius: '15px',
              width: '45%',
              left: '50%'
            }}>
            <span id="button-text">
              {isLoading ? (
                <BeatLoader
                  color="#ffffff"
                  loading={isLoading}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
              ) : (
                'Pay now'
              )}
            </span>
          </button>
        </div>
      </form>
    </>
  );
}
