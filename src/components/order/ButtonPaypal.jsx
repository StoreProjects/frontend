import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { PayPalButton } from "react-paypal-button-v2";
import { useDispatch, useSelector } from "react-redux";
import  { detailsOrder, payOrder } from '../../redux/actions/order';
import  { ORDER_PAY_RESET } from '../../redux/constants/order';
import { MessageBox } from "../../shared/messagebox/MessageBox";
import LoadingBox from "../../shared/loadingbox/LoadingBox";
export const ButtonPaypal = ({ order }) => {
  const params = useParams();
  const dispatch = useDispatch();
  const orderPay = useSelector((state) => state.orderPay);
  const {
    error: errorPay,
    loading: loadingPay,
    success: successPay,
  } = orderPay;

  const [clientId, setClientId] = useState(null);
  const [sdkReady, setSdkReady] = useState(false);
  useEffect(() => {
    const getClientID = async () => {
      const { data } = await axios.get(`/api/paypal`);
      setClientId(data);
      if (data) {
        setSdkReady(true);
      } else {
        setSdkReady(false);
      }
    };
    if (!order || successPay || (order && order._id !== params.id)) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch(detailsOrder(params.id));
    } else {
      if (!order.isPaid) {
        getClientID();
      } else {
        setSdkReady(true);
      }
    }
  }, [dispatch, params.id, sdkReady, successPay, order]);

  const successPaymentHandler = (paymentResult) => {
    // TODO: dispatch pay order
    dispatch(payOrder(order, paymentResult));
    //console.log(order, paymentResult);
  };

  return (
    <>
      {sdkReady ? (
        <>
          {errorPay && <MessageBox>{errorPay}</MessageBox>}
          {loadingPay && <LoadingBox />}
          <PayPalButton
            amount={order.totalPrice.toFixed(2)}
            options={{ clientId: clientId }}
            onSuccess={successPaymentHandler}
          />
        </>
      ) : (
        <div>cargando...</div>
      )}
    </>
  );
};
