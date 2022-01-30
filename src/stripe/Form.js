import { useState } from 'react';

import {
    PaymentElement,
    useStripe,
    useElements
} from '@stripe/react-stripe-js';


const Form = () => {

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
                return_url: 'http://localhost:3000/confirm',
            },
            redirect: 'if_required'
        });

        console.dir(result);

    }

    return (

        <form onSubmit={ submit }>

            <PaymentElement onReady={ () => setButtonView(true) } />
            <button className={ 'my-2 btn btn-dark ' + (buttonView ? 'd-block' : 'd-none') } disabled={ !stripe }>
                Pagar
            </button>

        </form>

    );

}

export default Form;
