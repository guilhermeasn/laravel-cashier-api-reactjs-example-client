import { Modal } from 'react-bootstrap';
import CardForm from '../stripe/CardForm';


export const ModalNewCard = ({ show = false, onCancel = () => {}, onSave = result => {} }) => <>

    <Modal centered size='lg' show={ show } onHide={ onCancel }>

        <Modal.Header className='alert alert-primary' closeButton>
            <Modal.Title className='no-select'>Novo Cartão</Modal.Title>
        </Modal.Header>

        <Modal.Body style={ { minHeight: '200px' } }>
            <CardForm onSave={ onSave } />
        </Modal.Body>

    </Modal>

</>;
