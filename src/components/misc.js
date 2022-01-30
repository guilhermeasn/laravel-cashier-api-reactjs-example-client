
export const Exhibit = ({ data = {}, type = 'info', classRoot = '', classChildren = '' }) => (

    <div className={ classRoot }>
        {
            Object.keys(data).map((key, index) => (

                <StaticData
                    className={ classChildren }
                    key={ index }
                    label={ key }
                    type={ type }
                >{

                    (typeof data[key] === 'string')    ? data[key]                                      :
                    (typeof data[key] === 'number')    ? data[key]                                      :
                    (typeof data[key] === 'boolean')   ? <strong>{ data[key] ? 'Sim' : 'Não' }</strong> :
                    (typeof data[key] === 'undefined') ? <em>Não informado</em>                         :
                    (data[key] === null)               ? <em>Não informado</em>                         :

                    JSON.stringify(data[key])

                }</StaticData>

            ))
        }
    </div>

);


export const StaticData = ({ label = '', className = '', type = 'info', children }) => (

    <div className={ 'p-3 ' + className }>
        <p className='text-muted m-0 p-0 h3'>{ label }</p>
        <p className={ `text-${type} border-${type} border-start p-1` }>
            { children }
        </p>
    </div>

);
