import {
    useState,
    useEffect
} from 'react';

import { CRUD } from '../support/http';

import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

import Form from './Form';


const PaymentForm = () => {
    
    const [ stripePromise, setStripePromise ] = useState(null);
    const [ clientIntent, setClientIntent ]   = useState(null);

    useEffect(() => {

        if(stripePromise === null) {

            (async () => {

                const { success, data, message } = await CRUD('CREATE', [
                    'api', 'cashier', 'intent'
                ], { user: '1' });
    
                if(success) {
    
                    setStripePromise(loadStripe(data.STRIPE_KEY))
                    setClientIntent(data.INTENT);
    
                } else if(message) alert(message);

            })();

        }

    }, [stripePromise, clientIntent]);

    return (stripePromise && clientIntent) ? (

        <Elements stripe={ stripePromise } options={ {
            clientSecret: clientIntent.client_secret,
            locale: 'pt-BR',
            appearance: {
                theme: 'flat',
                labels: 'floating'
            }
        } }>

            <Form />

        </Elements>

    ) : (

        <div className='text-center text-muted'>
             ... carregando ... 
        </div>

    );
};

export default PaymentForm;
