import { initialize } from 'crud-http';


export const CRUD = initialize({

    base_url: process.env.REACT_APP_SERVER

});
