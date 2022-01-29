import {
    useState,
    useEffect
} from 'react';

import { CRUD } from '../support/http';

import { loadStripe } from '@stripe/stripe-js';

import {
    Elements,
    PaymentElement
} from '@stripe/react-stripe-js';


export default () => {
    
    const [ stripePromise, setStripePromise ] = useState(null);
    const [ clientIntent, setClientIntent ]   = useState(null);
    const [ buttonView, setButtonView ]       = useState(false);

    useEffect(async () => {

        if(stripePromise === null) {
            const { success, data, message } = await CRUD('READ', [
                'api', 'cashier'
            ]);
            if(success) setStripePromise(loadStripe(data.STRIPE_KEY));
            else if(message) console.error(message);
        }

        if(clientIntent === null) {
            const { success, data, message } = await CRUD('CREATE', [
                'api', 'cashier', 'intent'
            ], {
                user: '1'
            });
            if(success) setClientIntent(data.intent);
            else if(message) console.error(message);
        }

    }, []);

    return (stripePromise && clientIntent) ? (
        <Elements stripe={ stripePromise } options={ { clientSecret: clientIntent.client_secret } }>
            <form>
                <PaymentElement onReady={ () => setButtonView(true) } />
                <button className={ 'my-2 btn btn-dark ' + (buttonView ? 'd-block' : 'd-none') }>Pagar</button>
            </form>
        </Elements>
    ) : (
        <div className='text-center text-muted'>
            ' ... carregando ... '
        </div>
    );
};
