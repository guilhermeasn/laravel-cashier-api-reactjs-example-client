

function App() {

    return (
        <>
            <div className="py-5 bg-dark text-light h2">
                <div className="container">
                    { process.env.REACT_APP_TITLE }
                </div>
            </div>
        </>
    );

}

export default App;
