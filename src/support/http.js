import { initialize } from 'crud-http';


export const CRUD = initialize({

    baseURL: process.env.REACT_APP_SERVER,
    headers: {
        Accept: 'application/json',
    }

});
