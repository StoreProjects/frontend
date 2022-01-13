import React from 'react';
export const CheckoutSteps = (props) => {
    return (
        <div className='flex flex-wrap justify-between lg:px-5 items-center checkout-steps'>
            <div className={`${ props.step1 ? 'active' : '' }`}>Sign-In</div>
            <div className={`${ props.step2 ? 'active' : '' }`}>Shipping</div>
            <div className={`${ props.step3 ? 'active' : '' }`}>Payment</div>
            <div className={`${ props.step4 ? 'active' : '' }`}>Order</div>
        </div>
    )
}
