import {
    useState,
    useEffect
} from 'react';

import {
    getCards,
    saveMethodPayment,
    deleteMethodPayment
} from '../stripe/api';

import {
    List,
    Loading
} from './misc';

import { BsFillCreditCardFill } from 'react-icons/bs';
import { FaTimes } from 'react-icons/fa';

import { ModalNewCard } from './modals';


const CardInfo = ({ brand, last4, exp, onDel = () => {} }) => <>

    <div className='row text-dark'>

        <div className='col-6 col-sm-4 text-nowrap py-1 m-0'>
            <BsFillCreditCardFill size='2em' color='#3a113a' />
            <span className='px-2 text-primary h6'>{ brand }</span>
        </div>

        <div className='col-6 col-sm-4 text-nowrap text-end text-sm-center text-muted py-1 m-0'>
            •••• { last4 }
        </div>

        <div className='col-12 col-sm-4 text-nowrap text-end text-warning h6 py-1 m-0'>
            Val. { exp }
            <FaTimes
                className='ms-2 my-1 clickable'
                size='1.2em'
                color='#700'
                onClick={ onDel }
                title='Excluir cartão'
            />
        </div>

    </div>

</>;


const Card = () => {

    const [ cards, setCards ] = useState(null);
    const [ modal, setModal ] = useState(false);
    const [ wait, setWait   ] = useState(true);

    function setCardsOrDie({ success, message, error, dataset }) {

        if(success) setCards(dataset);
        else {
            if(message) alert(message);
            if(error)   console.error(error)
        }

        setWait(false);

    }

    useEffect(() => { if(!cards) getCards().then(setCardsOrDie); }, [cards]);

    function newCard(result) {
        
        if('setupIntent' in result) {
            setWait(true);
            setModal(false);
            saveMethodPayment(result.setupIntent.payment_method).then(setCardsOrDie);
        } else if('error' in result) alert(result.error.message);
        else alert('Não foi possível salvar o cartão!');

    }

    function delCard(ID) {
        
        if(window.confirm('Tem certeza que deseja deletar um cartão?')) {
            setWait(true);
            deleteMethodPayment(ID).then(setCardsOrDie);
        }

    }

    return <>
    
        {
            (!Array.isArray(cards) || wait) ? <Loading dark />  :
            
            (cards.length > 0) ? (

                <List
                    dataset={ cards.map(({ id, card }) => (

                        <CardInfo
                            brand={ card.brand }
                            last4={ card.last4 }
                            exp={ ('00' + card.exp_month).slice(-2) + '/' + card.exp_year }
                            onDel={ () => delCard(id) }
                        />

                    )) }
                />

            ) : (

                <div className='alert alert-danger my-5 py-4'>
                    Nenhum cartão de crédito ou débito foi cadastrado!
                </div>

            )

        }

        <div className='my-3 border-top py-2 text-end'>
            <button className='btn btn-dark' onClick={ () => setModal(true) }>
                Novo Cartão
            </button>
        </div>

        <ModalNewCard
            show={ modal }
            onCancel={ () => setModal(false) }
            onSave={ newCard }
        />

    </>;

}


export default Card;
