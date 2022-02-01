import { useState } from 'react';

import {
    Button,
    Modal,
    Form
} from 'react-bootstrap';

import CardForm from '../stripe/CardForm';


export const ModalNewCharge = ({ show = false, cards = null, onCancel = () => {}, onConfirm = () => {} }) => {

    const preset = {
        description: '',
        amount: '',
        card: '',
    };

    const [ data, setData ] = useState(preset);

    return (

        <Modal centered show={ show } onHide={ () => { onCancel(); setData(preset); } } backdrop='static'>

            <Modal.Header className='alert alert-primary' closeButton>
                <Modal.Title className='no-select'>Nova Compra</Modal.Title>
            </Modal.Header>

            <Modal.Body>

                <Form>

                    <Form.Control className='mb-3' type="text" placeholder="Descrição do Produto" value={ data.description } onChange={ input => setData({ ...data, description: input.currentTarget.value }) } />
                    <Form.Control className='mb-3' type="number" placeholder="Valor do Produto" value={ data.amount } onChange={ input => setData({ ...data, amount: input.currentTarget.value }) } />

                    <Form.Select value={ data.card } onChange={ select => setData({ ...data, card: select.currentTarget.value }) }>
                        {

                            (cards === null) ? <option value='' disabled> carregando ... </option> :
                            
                            (Array.isArray(cards) && cards.length > 0) ? <>

                                <option value='' disabled> --- Selecione um cartão --- </option>

                                { cards.map((card, index) => (
                                    <option key={ index } value={ card.id }>{ card.description }</option>
                                )) }

                            </> : <option value='' disabled> --- Nenhum cartão salvo --- </option>

                        }
                    </Form.Select>

                </Form>

            </Modal.Body>

            <Modal.Header className='border-top d-flex justify-content-end mt-3'>
                <Button variant='primary' className='mx-2' onClick={ () => onConfirm(data) } disabled={ Object.values(data).some(v => !v) }>
                    Pagar
                </Button>
            </Modal.Header>

        </Modal>

    );

};

export const ModalNewCard = ({ show = false, onCancel = () => {}, onSave = result => {}, onAlert = () => {} }) => <>

    <Modal centered size='lg' show={ show } onHide={ onCancel } backdrop='static'>

        <Modal.Header className='alert alert-primary' closeButton>
            <Modal.Title className='no-select'>Novo Cartão</Modal.Title>
        </Modal.Header>

        <Modal.Body style={ { minHeight: '200px' } }>
            <CardForm onAlert={ onAlert } onSave={ onSave } />
        </Modal.Body>

    </Modal>

</>;

export const ModalAlert = ({ show = false, type = 'danger', message = '', onHide = () => {}, onConfirm = null }) => <>

    <Modal centered show={ show } onHide={ onHide } backdrop='static'>

        <Modal.Header className={ 'alert alert-' + type } closeButton>
            <Modal.Title className='no-select'>
                { (typeof onConfirm === 'function') ? 'Confirmação!' : 'Alerta!' }
            </Modal.Title>
        </Modal.Header>

        <Modal.Body>{ message }</Modal.Body>

        <Modal.Header className='border-top d-flex justify-content-end mt-3'>
            { (typeof onConfirm === 'function') ? <>
                <Button variant='secondary' className='mx-2' onClick={ onHide }>Não</Button>
                <Button variant='primary' className='mx-2' onClick={ onConfirm }>Sim</Button>
            </> : <>
                <Button variant='dark' className='mx-2' onClick={ onHide }>Ok</Button>
            </> }
        </Modal.Header>

    </Modal>

</>;
