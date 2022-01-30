import {
    useState,
    useEffect
} from 'react';

import {
    getCustomer,
    getStripePortal
} from '../stripe/api';

import {
    Exhibit,
    Loading
} from './misc';

const General = () => {

    const [ customer, setCustomer ] = useState(null);
    const [ stripePortal, setStripePortal] = useState(null);

    useEffect(() => {

        if(!customer) getCustomer().then(({ success, message, error, data }) => {
            if(success) setCustomer(data.customer);
            else {
                if(message) alert(message);
                if(error)   console.error(error)
            }
        });

        if(!stripePortal) getStripePortal().then(({ success, data: { url }}) => {
            if(success) setStripePortal(url);
        });

    }, [customer, stripePortal]);

    return <>

        <div>
            { 
                customer ? 

                    <Exhibit
                        data={ {
                            'Nome do Cliente': customer.name,
                            'E-mail':          customer.email,
                            'Telefone':        customer.phone,
                            'Moeda':           customer.currency && customer.currency.toUpperCase(),
                            'Cliente Real':    customer.livemode,
                            'Registrado em':   new Date(customer.created * 1000).toLocaleString()
                        } }
                        type='success'
                        classRoot='row'
                        classChildren='col-12 col-lg-6'
                    />
                    
                    : <Loading dark />
            }
        </div>

        <div className='my-3 border-top py-2 text-end'>
            <button
                className='btn btn-dark'
                onClick={ () => window.open(stripePortal, '_blank') }
                disabled={ !stripePortal }
            >Stripe Portal</button>
        </div>
        
    </>;

}


export default General;
