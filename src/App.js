import { useState } from 'react';

import {
    Menu,
    General,
    Card,
    Product,
    Subscription
} from "./components";


function App() {

    const [ active, setActive ] = useState(0);

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
                    'Cartão',
                    'Produtos',
                    'Assinaturas'
                ] }
                active={ active }
                onClick={ setActive }
            />

            <div className="tab-content py-3">
                {

                    (active === 0) ? <General />      :
                    (active === 1) ? <Card />         :
                    (active === 2) ? <Product />      :
                    (active === 3) ? <Subscription /> :

                    <div className='alert alert-danger'>
                        Nenhum recurso selecionado!
                    </div>

                }
            </div>
            
        </div>

    </>;

}


export default App;
