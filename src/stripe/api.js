import { CRUD } from '../support/http';


export const getCustomer = async () => await CRUD('READ', [
    'api', process.env.REACT_APP_CUSTOMER, 'customer'
]);

export const getStripePortal = async () => await CRUD('CREATE', [
    'api', process.env.REACT_APP_CUSTOMER, 'customer', 'portal'
], { return_url: window.location.href });
