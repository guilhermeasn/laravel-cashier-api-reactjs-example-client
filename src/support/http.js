import axios from 'axios';


export const http = axios.create({
    baseURL: process.env.REACT_APP_SERVER,
    headers: {
        Accept: 'application/json'
    }
});

export const CRUD = async (mode, path = [], input = {}) => {

    const location = path.join('/');
    const params   = input => input ? '?' + new URLSearchParams(input).toString() : '';

    const result = {
        response: {},
        success:  null,
        message:  '',
        dataset:  [],
        data:     {},
        error:    '',
        errors:   {}
    }

    try {

        switch(mode) {

            case 'CREATE': result.response = await http.post(location, input);             break;
            case 'READ':   result.response = await http.get(location + params(input));     break;
            case 'UPDATE': result.response = await http.put(location, input);              break;
            case 'DELETE': result.response = await http.delete(location, { data: input }); break;
    
            default: console.error('The CRUD function only accepts the modes: CREATE, READ, UPDATE or DELETE');
            
            throw new Error('Ocorreu um erro inesperado!');
    
        }

        result.success = true;

    } catch(reject) {

        if(typeof reject.response !== 'undefined') result.response = reject.response;
        else {
            result.message  = (typeof reject === 'string') ? reject : 'Ocorreu um erro desconhecido!';
            result.response = reject;
        }

    }

    if(typeof result.response.status !== 'undefined' && result.response.status === 400) {
        result.success = false;
    }

    if(typeof result.response.data !== 'undefined') {

        if(Array.isArray(result.response.data)) result.dataset = result.response.data;
        else if(typeof result.response.data === 'string') result.message = result.response.data;
        else if(typeof result.response.data === 'object') {

            if(typeof result.response.data.message === 'string') result.message = result.response.data.message;
            if(typeof result.response.data.error   === 'string') result.error   = result.response.data.error;
            if(typeof result.response.data.errors  === 'object') result.errors  = result.response.data.errors;
            if(Array.isArray(result.response.data.dataset))      result.dataset = result.response.data.dataset;

            Object.keys(result.response.data).forEach(key => {
                if(key !== 'message' && key !== 'dataset'&& key !== 'error' && key !== 'errors') {
                    result.data = {
                        ...result.data,
                        [key]: result.response.data[key]
                    }
                }
            });
            
        } else result.data = { 'result': result.response.data };
        
    }

    return result;

}

export default http;
