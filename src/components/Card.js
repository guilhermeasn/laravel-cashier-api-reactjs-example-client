import {
    useState,
    useEffect
} from 'react';

import { getCards } from '../stripe/api';

import { List } from './misc';

import { BsFillCreditCardFill } from 'react-icons/bs';
import { FaTimes } from 'react-icons/fa';

import { Modal, Button } from 'react-bootstrap';
import CardForm from '../stripe/CardForm';


const CardInfo = ({ brand, last4, exp }) => <>

    <div className='row text-dark'>

        <div className='col-6 col-sm-4 text-nowrap'>
            <BsFillCreditCardFill size='2em' color='#3a113a' />
            <span className='px-2 text-primary h6'>{ brand }</span>
        </div>

        <div className='col-6 col-sm-4 text-nowrap text-end text-sm-center text-muted'>
            •••• { last4 }
        </div>

        <div className='col-12 col-sm-4 text-nowrap text-end text-warning h6'>
            Val. { exp }
            <FaTimes
                className='ms-2 mb-1 clickable'
                size='1.2em'
                color='#700'
                onClick={ () => alert('not implemented') }
                title='Excluir cartão'
            />
        </div>

    </div>

</>;

const ModalNewCard = ({ show = false, onCancel = () => {}, onConfirm = () => {} }) => <>

    <Modal centered size='lg' show={ show } onHide={ onCancel }>

        <Modal.Header className='alert alert-primary' closeButton>
            <Modal.Title className='no-select'>Novo Cartão</Modal.Title>
        </Modal.Header>

        <Modal.Body style={ { minHeight: '200px' } }>
            <CardForm />
        </Modal.Body>

    </Modal>

</>;

const Card = () => {

    const [ cards, setCards ] = useState(null);
    const [ modal, setModal ] = useState(false);

    useEffect(() => {

        if(!cards) getCards().then(({ success, message, error, dataset }) => {

            if(success) setCards(dataset);
            else {
                if(message) alert(message);
                if(error)   console.error(error)
            }

        });

    }, [cards]);

    return <>
    
        {
            (!Array.isArray(cards)) ? <div className='my-5 text-muted'>carregando ...</div>  :
            
            (cards.length > 0) ? (

                <List
                    dataset={ cards.map(({ card }) => (

                        <CardInfo
                            brand={ card.brand }
                            last4={ card.last4 }
                            exp={ ('00' + card.exp_month).slice(-2) + '/' + card.exp_year }
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
        />

    </>;

}


export default Card;
