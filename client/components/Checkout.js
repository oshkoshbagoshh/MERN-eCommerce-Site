/*
 * @Author: AJ Javadi 
 * @Email: amirjavadi25@gmail.com
 * @Date: 2023-08-28 22:37:03 
 * @Last Modified by: Someone
 * @Last Modified time: 2023-08-28 22:40:06
 * @Description:  helper function created to handle payment via Stripe Checkout. 
 * We use the Stripe Checkout component to handle the payment.
 * 
 */
import StripeCheckout from 'react-stripe-checkout';

const STRIPE_PUBLISHABLE = 'pk_test_**********************';

const onToken = (user, checkout) => token =>
    checkout(user, token.id);
    
const Checkout = ({ amount, user, checkout }) => 
    <StripeCheckout
        amount={amount*100}
        token={onToken(user, checkout)}
        currency="INR"
        stripeKey={STRIPE_PUBLISHABLE}
    />;

export default Checkout;