import { useState } from 'react';

import {
    PaymentElement,
    useStripe,
    useElements
} from '@stripe/react-stripe-js';


const CardFormElement = ({ onConfirm = () => {}, onSave = result => {} }) => {

    const stripe   = useStripe();
    const elements = useElements();

    const [ buttonEnabled, setButtonEnabled ] = useState(false);

    const submit = async event => {

        event.preventDefault();

        setButtonEnabled(false);

        if (!stripe || !elements) {
            onConfirm('Não foi possível salvar o cartão! Tente novamente!');
            console.error('Stripe not ready!');
            return;
        }

        const result = await stripe.confirmSetup({
            elements,
            confirmParams: {
                return_url: window.location.href,
            },
            redirect: 'if_required'
        });

        onSave(result);

        setTimeout(() => setButtonEnabled(true), 3000);

    }

    return (

        <form onSubmit={ submit }>

            <PaymentElement onReady={ () => setButtonEnabled(true) } />

            <div className='border-top mt-3 py-2 text-end'>
                <button className='btn btn-primary' disabled={ !stripe || !buttonEnabled }>
                    Salvar Cartão
                </button>
            </div>

        </form>

    );

}

export default CardFormElement;
