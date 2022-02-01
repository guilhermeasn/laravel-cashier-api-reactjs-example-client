import {
    useState,
    useEffect
} from 'react';

import { getCharges } from '../stripe/api';

import {
    Loading,
    List
} from './misc';

import {
    AiFillLike,
    AiFillDislike
} from 'react-icons/ai';

import { BsFillCreditCardFill } from 'react-icons/bs';


const ChargeInfo = ({ amount = 0, description = '', status = '', card_brand = '', card_last4 = ''}) => <>

    <div className='row text-center'>

        <div className='col-6 col-md-4 text-primary text-nowrap text-md-start'><BsFillCreditCardFill size='2em' color='#3a113a' />&nbsp;{ card_brand }&nbsp;{ card_last4 }</div>
        <div className='col-6 col-md-3 text-dark h6 text-md-center'>{ description || 'Sem descrição' }</div>
        <div className='col-6 col-md-3 text-danger text-md-nowrap text-center'>{ amount.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}) }</div>
        <div className='col-6 col-md-2 h5 text-md-end'>{ (status === "succeeded") ? <AiFillLike color='#070' /> : <AiFillDislike color='#700' /> }</div>

    </div>

</>;

const Product = (onAlert = () => {}) => {

    const [ charges, setCharges ] = useState(null);

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

    if(charges === null) return <Loading dark />;

    return <>
    
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

        <div className='my-3 border-top py-2 text-end'>
            <button className='btn btn-dark'>
                Nova Compra
            </button>
        </div>
    
    </>;

}


export default Product;
