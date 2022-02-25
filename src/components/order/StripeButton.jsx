import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { detailsOrder, payOrderStripe } from "../../redux/actions/order";
import LoadingBox from "../../shared/loadingbox/LoadingBox";
import { ORDER_PAY_RESET } from "../../redux/constants/order";
import axios from "axios";

const CheckoutForm = ({ order }) => {

  const params = useParams();
  
  const dispatch = useDispatch();

  const stripe = useStripe();
  const elements = useElements();

  const orderPay = useSelector((state) => state.orderPay);
  const {
    error: errorPay,
    loading: loadingPay,
    success: successPay,
  } = orderPay;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    if (!error) {
      console.log(paymentMethod);

      dispatch(payOrderStripe(order, paymentMethod));

    }
  };

  useEffect(() => {

    if (!order || successPay || (order && order._id !== params.id)) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch(detailsOrder(params.id));
    }
    
  }, [dispatch, params.id, successPay, order]);

  return ( 
    <form onSubmit={handleSubmit}>
      <img
        src={`${ process.env.PUBLIC_URL }/img/stripe.png`}
        alt="Stripe"
        className="w-72 h-32 m-auto mb-2"
      />
      <CardElement className="bg-slate-200 py-5 px-2 rounded" />
      <button
        type="submit"
        className="mt-5 transition bg-indigo-500 hover:bg-indigo-700 duration-300 text-white font-bold py-2 px-4 rounded w-full"  
      >
        {
          loadingPay ? <LoadingBox /> : ( "Comprar" )
        }
      </button>
      {
        errorPay && (<p>{ errorPay }</p>)
      }
    </form>
  );
};

export const StripeButton = ({ order }) => {

  const [ID, setID] = useState('');

  const getCliendID =  async() => {

    const { data: { clientID } } = await axios.get(`/api/stripe`);
    return clientID;

  }

  useEffect(() => {

    const fetchClientID = async() => {
      setID(await getCliendID());
    }
    fetchClientID();

  }, []);

  let stripeMaker;

  if( !ID ) {

    stripeMaker = <p>Cargando...</p>;

  } else {

    const stripe = loadStripe(ID);

    stripeMaker = (
      <Elements stripe={stripe}>
        <CheckoutForm order={ order } />
      </Elements> 
    )

  }

  
  return stripeMaker;

};
