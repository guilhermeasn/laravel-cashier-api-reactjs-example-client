import {
    Button,
    Modal
} from 'react-bootstrap';

import CardForm from '../stripe/CardForm';


export const ModalNewCard = ({ show = false, onCancel = () => {}, onSave = result => {}, onConfirm = () => {} }) => <>

    <Modal centered size='lg' show={ show } onHide={ onCancel } backdrop='static'>

        <Modal.Header className='alert alert-primary' closeButton>
            <Modal.Title className='no-select'>Novo Cartão</Modal.Title>
        </Modal.Header>

        <Modal.Body style={ { minHeight: '200px' } }>
            <CardForm onConfirm={ onConfirm } onSave={ onSave } />
        </Modal.Body>

    </Modal>

</>;

export const ModalConfirm = ({ show = false, type = 'danger', message = '', onHide = () => {}, onConfirm = null }) => <>

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
