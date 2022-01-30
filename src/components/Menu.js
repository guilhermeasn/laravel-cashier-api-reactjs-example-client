import { useState } from 'react';


const Menu = ({ items = [], onSelect = item => {} }) => {

    const [ active, setActive ] = useState(items.length ? items[0] : null);

    return <>

        <nav>
            <div className="nav nav-tabs" role="tablist">
                {
                    items.map((item, key) => (
                        <span
                            key={ key }
                            className={ 'nav-item nav-link ' + (active === item && 'active') }
                            data-toggle='tab'
                            role='tab'
                            onClick={ () => {
                                setActive(item);
                                onSelect(item);
                            } }
                            style={ {
                                cursor: 'pointer',
                                userSelect: 'none'
                            } }
                        >{ item }</span>
                    ))
                }
            </div>
        </nav>

    </>;

}


export default Menu;
