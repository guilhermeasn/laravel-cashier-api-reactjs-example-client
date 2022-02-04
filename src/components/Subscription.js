import {
    useState,
    useEffect
} from 'react';

import {
    AiFillDislike,
    AiFillLike
} from 'react-icons/ai';
import { FaTimes } from 'react-icons/fa';

import {
    cancelSubscribe,
    getCards,
    getPlans,
    getSubscriptions,
    subscribe
} from '../stripe/api';

import { List, Loading } from './misc';
import { ModalNewSubscription } from './modals';


const SubscriptionInfo = ({ id, status, plan: { amount, interval}, product: { name } }, onDel = id => {}) => <>

    <div className='row'>

        <div className='col-12 col-md-3 text-danger text-start'>{ name }</div>
        <div className='col-6 col-md-6 text-dark h6 text-start text-md-center'>{ (amount/100).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}) } / { interval}</div>
        <div className='col-6 col-md-3 text-primary text-end'>
            { (status === 'active') ? <AiFillLike size='1.5em' color='#070' /> : <AiFillDislike size='1.5em' color='#700' /> }
            <FaTimes
                className='ms-2 my-1 clickable'
                size='1.2em'
                color='#700'
                onClick={ () => onDel(id) }
                title='Excluir cartão'
            />
        </div>

    </div>

</>;

const Subscription = ({ onAlert = () => {} }) => {

    const [ subscriptions, setSubscription ] = useState(null);

    const [ modal, setModal ] = useState(false);
    const [ plans, setPlans ] = useState(null);
    const [ cards, setCards ] = useState(null);

    const [ wait, setWait ] = useState(true);

    function preparePlans({ prices: { data: prices = [] }, products: { data: products = [] } }) {
        
        return prices.map(price => ({

            id: price.id,

            description: products.filter(product => product.id === price.product)[0].name + ' ' +
                         (price.unit_amount/100).toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})

        }));

    }

    function loadSubscriptionOrDie({ success, dataset, message, error }) {
        setWait(false);
        if(success) setSubscription(dataset);
        else {
            if(message) onAlert(message);
            if(error) console.error(error);
        }
    }

    function makeSubscription({ plan, card }) {
        setWait(true);
        setModal(false);
        subscribe(plan, card).then(loadSubscriptionOrDie);
    }

    function delSubscription(id) {
        onAlert('Tem certeza que deseja cancelar esta assinatura?', () => {
            setWait(true);
            console.log(id);
            cancelSubscribe(id).then(loadSubscriptionOrDie);
        });
    }

    useEffect(() => {

        const abort = new AbortController();

        if(subscriptions === null) {

            getSubscriptions(abort.signal).then(loadSubscriptionOrDie);

        }

        if(plans === null) {

            getPlans(abort.signal).then(( { success, data, message, error } ) => {
                if(success) setPlans(preparePlans(data));
                else {
                    if(message) onAlert(message);
                    if(error) console.error(error);
                }
            });

        }

        if(cards === null) {
            getCards().then(({ success, message, error, dataset }) => {

                if(success) {
                    setCards(dataset.map(data => ({
                        id: data.id,
                        description: `${data.card.brand.toUpperCase()} - final ${data.card.last4} - val. ${data.card.exp_month}/${data.card.exp_year}`
                    })));
                } else {
                    if(message) onAlert(message);
                    if(error)   console.error(error)
                }

            });
        }

        return () => abort.abort();
        
    });

    return <>
    
        { (subscriptions === null || wait) ? <Loading dark /> : subscriptions.length ? <>
            
            <List dataset={ subscriptions.map(s => SubscriptionInfo(s, delSubscription)) } />

        </> : <>
            
        <div className='alert alert-danger my-5 py-4'>
            Nenhuma assinatura registrada!
        </div>

        </> }

        <div className='my-3 border-top py-2 text-end'>
            <button className='btn btn-dark' onClick={ () => setModal(true) }>
                Nova Assinatura
            </button>
        </div>

        <ModalNewSubscription
            show={ modal }
            plans={ plans }
            cards={ cards }
            onCancel={ () => setModal(false) }
            onConfirm={ makeSubscription }
        />

    </>;

}


export default Subscription;
