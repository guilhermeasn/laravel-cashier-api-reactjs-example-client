import {
    useState,
    useEffect
} from 'react';

import { getIntent } from './api';

import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

import CardFormElement from './CardFormElement';

import { Loading } from '../components/misc';


const CardForm = ({ onConfirm = () => {}, onSave = result => {} }) => {

    const [ stripePromise, setStripePromise ] = useState(null);
    const [ clientIntent, setClientIntent ]   = useState(null);

    const [ wait, setWait ] = useState(true);

    useEffect(() => {

        if(!stripePromise) getIntent().then(({ success, message, error, data: { STRIPE_KEY, INTENT } }) => {
            if(success) {

                setStripePromise(loadStripe(STRIPE_KEY))
                setClientIntent(INTENT);

                setTimeout(() => setWait(false), 5000);

            } else {

                if(message) onConfirm('danger', message);
                if(error)   console.error(error)

            }
        });

    }, [stripePromise, clientIntent]);

    return (stripePromise && clientIntent) ? <>

        <div className={ wait ? '' : 'd-none' }>
            <Loading dark text='Carregando formulário' />
        </div>

        <div className={ wait ? 'invisible' : 'visible' }>
            <Elements stripe={ stripePromise } options={ {
                clientSecret: clientIntent.client_secret,
                locale: 'pt-BR',
                appearance: {
                    theme: 'night',
                    labels: 'floating'
                }
            } }><CardFormElement onConfirm={ onConfirm } onSave={ onSave } /></Elements>
        </div>

    </> : <Loading dark />;

}


export default CardForm;
