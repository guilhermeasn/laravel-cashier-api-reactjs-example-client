import {
    useState,
    useEffect
} from 'react';

import { getIntent } from './api';

import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

import CardFormElement from './CardFormElement';


const CardForm = () => {

    const [ stripePromise, setStripePromise ] = useState(null);
    const [ clientIntent, setClientIntent ]   = useState(null);

    useEffect(() => {

        if(!stripePromise) getIntent().then(({ success, message, error, data: { STRIPE_KEY, INTENT } }) => {
            if(success) {

                setStripePromise(loadStripe(STRIPE_KEY))
                setClientIntent(INTENT);

            } else {

                if(message) alert(message);
                if(error)   console.error(error)

            }
        });

    }, [stripePromise, clientIntent]);

    return (stripePromise && clientIntent) ? (

        <Elements stripe={ stripePromise } options={ {
            clientSecret: clientIntent.client_secret,
            locale: 'pt-BR',
            appearance: {
                theme: 'night',
                labels: 'floating'
            }
        } }><CardFormElement /></Elements>

    ) : (

        <div className='text-center text-muted my-5'>
            carregando ... 
        </div>

    );

}


export default CardForm;
