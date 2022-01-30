// import Stripe from './stripe';

function App() {

    return (<>
        
        <div className="py-5 bg-dark text-light h2">
            <div className="container">
                { process.env.REACT_APP_TITLE }
            </div>
        </div>
        
        <div className="my-3 container">
            Em construção ...
            {/* <Stripe /> */}
        </div>

    </>);

}

export default App;
