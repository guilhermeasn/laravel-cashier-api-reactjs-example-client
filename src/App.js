import Menu from "./components/Menu";


function App() {

    return (<>
        
        <div className="py-5 bg-dark text-light h2">
            <div className="container">
                { process.env.REACT_APP_TITLE }
            </div>
        </div>
        
        <div className="my-3 container">
            <Menu items={[
                'Geral',
                'Cartão',
                'Produto',
                'Assinatura'
            ]} onSelect={ item => console.log(item) } />
        </div>

    </>);

}


export default App;
