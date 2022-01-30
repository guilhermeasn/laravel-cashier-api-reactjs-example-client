import { CRUD } from '../support/http';


export const getCustomer = async () => await CRUD('READ', [
    'api', process.env.REACT_APP_CUSTOMER, 'customer'
]);

export const getStripePortal = async () => await CRUD('CREATE', [
    'api', process.env.REACT_APP_CUSTOMER, 'customer', 'portal'
], { return_url: window.location.href });

export const getCards = async () => await CRUD('READ', [
    'api', process.env.REACT_APP_CUSTOMER, 'paymentMethod'
]);

export const getIntent = async () => await CRUD('READ', [
    'api', process.env.REACT_APP_CUSTOMER, 'paymentMethod', 'intent'
]);

export const saveMethodPayment = async methodPayment => await CRUD('CREATE', [
    'api', process.env.REACT_APP_CUSTOMER, 'paymentMethod'
], { ID: methodPayment });

export const deleteMethodPayment = async methodPayment => await CRUD('DELETE', [
    'api', process.env.REACT_APP_CUSTOMER, 'paymentMethod', methodPayment
]);
