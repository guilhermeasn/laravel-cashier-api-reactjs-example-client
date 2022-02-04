import {
    useState,
    useEffect
} from 'react';

import {
    charge,
    getCards,
    getCharges
} from '../stripe/api';

import {
    Loading,
    List
} from './misc';

import {
    AiFillLike,
    AiFillDislike
} from 'react-icons/ai';

import { BsFillCreditCardFill } from 'react-icons/bs';
import { ModalNewCharge } from './modals';
import { preparePriceStripe } from '../support/misc';


const ChargeInfo = ({ amount = 0, description = '', status = '', card_brand = '', card_last4 = ''}) => <>

    <div className='row text-center'>

        <div className='col-6 col-md-4 text-primary text-nowrap text-md-start'><BsFillCreditCardFill size='2em' color='#3a113a' />&nbsp;{ card_brand }&nbsp;{ card_last4 }</div>
        <div className='col-6 col-md-3 text-dark h6 text-md-center'>{ description || 'Sem descrição' }</div>
        <div className='col-6 col-md-3 text-danger text-md-nowrap text-center'>{ (amount/100).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}) }</div>
        <div className='col-6 col-md-2 h5 text-md-end'>{ (status === "succeeded") ? <AiFillLike color='#070' /> : <AiFillDislike color='#700' /> }</div>

    </div>

</>;

const Product = (onAlert = () => {}) => {

    const [ charges, setCharges ] = useState(null);

    const [ modal, setModal ] = useState(false);
    const [ cards, setCards ] = useState(null);

    useEffect(() => {
        if(!charges) {
            
            const abort = new AbortController();

            getCharges(abort.signal).then(( { success, message, error, data: { charges} } ) => {
                if(success) setCharges(charges);
                else {
                    if(message) onAlert(message);
                    if(error) console.log(error);
                }
            })

            return () => abort.abort();

        }
    });

    function loadCards() {

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

    }

    function makeCharge({ description = '', amount = '', card = '' }) {

        charge(description, preparePriceStripe(amount), card).then(({ success, message, error }) => {
            if(success) {
                setCharges(null);
            } else {
                onAlert('Não foi possível realizar o pagamento! ' + message);
                console.error(error);
            }
        });

    }

    return <>
    
        { (charges === null) ? <Loading dark /> : charges.length ? (

            <List dataset={

                charges.map(( { amount, description, status, payment_method_details: { card: { brand, last4 } } } ) => (

                    <ChargeInfo
                        amount={ amount }
                        description={ description }
                        status={ status }
                        card_brand={ brand }
                        card_last4={ last4 }
                    />

                ))

            } />

        ) : (
            <div className='alert alert-danger my-5 py-4'>
                Nenhuma produto foi comprado!
            </div>
        ) }
        
        <div className='my-3 border-top py-2 text-end'>
            <button className='btn btn-dark' onClick={ () => { setModal(true); loadCards(); } }>
                Nova Compra
            </button>
        </div>

        <ModalNewCharge
            show={ modal }
            cards={ cards }
            onCancel={ () => setModal(false) }
            onConfirm={ data => {
                setModal(false);
                makeCharge(data);
            } }
        />
    
    </>;

}


export default Product;
