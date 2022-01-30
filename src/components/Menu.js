
const Menu = ({ items = [], active = 0, onClick = index => {} }) => <>

    <nav>
        <div className="nav nav-tabs" role="tablist">
            {
                items.map((item, index) => (
                    <span
                        key={ index }
                        className={ 'nav-item nav-link' + (active === index ? ' active' : '') }
                        data-toggle='tab'
                        role='tab'
                        onClick={ () => onClick(index) }
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


export default Menu;
