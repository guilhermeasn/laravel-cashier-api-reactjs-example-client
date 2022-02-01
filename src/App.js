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

    const [ active, setActive ] = useState(0);
    const [ alert, setAlert ]   = useState({
        show: false,
        message: '',
        onConfirm: null,
    });

    function alertAction(message = '', onConfirm = null) {
        setAlert({ show: true, message, onConfirm });
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

                    (active === 0) ? <General onAlert={ alertAction } />      :
                    (active === 1) ? <Card onAlert={ alertAction } />         :
                    (active === 2) ? <Product onAlert={ alertAction } />      :
                    (active === 3) ? <Subscription onAlert={ alertAction } /> :

                    <div className='alert alert-danger'>
                        Nenhum recurso selecionado!
                    </div>

                }
            </div>
            
        </div>

        <ModalConfirm
            type='danger'
            show={ alert.show }
            message={ alert.message }
            onHide={ () => setAlert({ ...alert, show: false }) }
            onConfirm={ (typeof alert.onConfirm === 'function') ? () => {
                setAlert({ ...alert, show: false });
                alert.onConfirm();
            } : null }
        />

    </>;

}


export default App;
