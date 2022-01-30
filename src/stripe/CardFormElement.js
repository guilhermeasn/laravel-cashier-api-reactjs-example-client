import { useState } from 'react';

import {
    PaymentElement,
    useStripe,
    useElements
} from '@stripe/react-stripe-js';


const CardFormElement = () => {

    const stripe   = useStripe();
    const elements = useElements();

    const [ buttonView, setButtonView ] = useState(false);

    const submit = async event => {

        event.preventDefault();

        if (!stripe || !elements) {
            console.error('Stripe not ready!')
            return;
        }

        const result = await stripe.confirmSetup({
            elements,
            confirmParams: {
                return_url: window.location.href,
            },
            redirect: 'if_required'
        });

        console.dir(result);

    }

    return (

        <form onSubmit={ submit }>

            <PaymentElement onReady={ () => setButtonView(true) } />

            <div className='border-top mt-3 py-2 text-end'>
                <button className={ 'btn btn-primary ' + (buttonView ? 'd-inline' : 'd-none') } disabled={ !stripe }>
                    Salvar Cartão
                </button>
            </div>

        </form>

    );

}

export default CardFormElement;
