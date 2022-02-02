import {
    useState,
    useEffect
} from 'react';
import { AiFillDislike, AiFillLike } from 'react-icons/ai';

import { getSubscriptions } from '../stripe/api';

import { List, Loading } from './misc';


const SubscriptionInfo = ({ status, plan: { amount, interval}, product: { name } }) => <>

    <div className='row'>

        <div className='col-12 col-md-3 text-danger text-start'>{ name }</div>
        <div className='col-6 col-md-6 text-dark h6 text-start text-md-center'>{ (amount/100).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}) } / { interval}</div>
        <div className='col-6 col-md-3 text-primary text-end'>{ (status === 'active') ? <AiFillLike size='1.5em' color='#070' /> : <AiFillDislike size='1.5em' color='#700' /> }</div>

    </div>

</>;

const Subscription = ({ onAlert = () => {} }) => {

    const [ subscriptions, setSubscription ] = useState(null);

    useEffect(() => {
        if(subscriptions === null) {

            const abort = new AbortController();

            getSubscriptions(abort.signal).then(( { success, dataset , message, error } ) => {
                console.dir(dataset);
                if(success) setSubscription(dataset);
                else {
                    if(message) onAlert(message);
                    if(error) console.error(error);
                }
            });

            return () => abort.abort();

        }
    });

    return <>
    
        { (subscriptions === null) ? <Loading dark /> : <>
            
            <List dataset={ subscriptions.map(s => SubscriptionInfo(s)) } />

        </> }

        <div className='my-3 border-top py-2 text-end'>
            <button className='btn btn-dark'>
                Nova Assinatura
            </button>
        </div>

    </>;

}


export default Subscription;
