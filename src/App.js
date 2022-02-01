import { useState } from 'react';

import {
    Menu,
    General,
    Card,
    Product,
    Subscription
} from "./components";

import { ModalConfirm } from './components/modals';


function App() {

    const [ active, setActive ]   = useState(0);
    const [ confirm, setConfirm ] = useState({
        show: false,
        message: '',
        onConfirm: null,
    });

    function confirmAction(message = '', onConfirm = null) {
        setConfirm({ show: true, message, onConfirm });
    }

    return <>
        
        <div className="py-5 bg-dark text-light h2">
            <div className="container">
                { process.env.REACT_APP_TITLE }
            </div>
        </div>
        
        <div className="my-3 container">

            <Menu
                items={ [
                    'Geral',
                    'Cartões',
                    'Compras',
                    'Assinaturas'
                ] }
                active={ active }
                onClick={ setActive }
            />

            <div className="tab-content py-3">
                {

                    (active === 0) ? <General onConfirm={ confirmAction } />      :
                    (active === 1) ? <Card onConfirm={ confirmAction } />         :
                    (active === 2) ? <Product onConfirm={ confirmAction } />      :
                    (active === 3) ? <Subscription onConfirm={ confirmAction } /> :

                    <div className='alert alert-danger'>
                        Nenhum recurso selecionado!
                    </div>

                }
            </div>
            
        </div>

        <ModalConfirm
            type='danger'
            show={ confirm.show }
            message={ confirm.message }
            onHide={ () => setConfirm({ ...confirm, show: false }) }
            onConfirm={ (typeof confirm.onConfirm === 'function') ? () => {
                setConfirm({ ...confirm, show: false });
                confirm.onConfirm();
            } : null }
        />

    </>;

}


export default App;
