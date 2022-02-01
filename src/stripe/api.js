import { CRUD } from '../support/http';


export const getCustomer = async abortSignal => await CRUD('READ', [
    'api', process.env.REACT_APP_CUSTOMER, 'customer'
], {}, { signal: abortSignal });

export const getStripePortal = async abortSignal => await CRUD('CREATE', [
    'api', process.env.REACT_APP_CUSTOMER, 'customer', 'portal'
], { return_url: window.location.href }, { signal: abortSignal });

export const getCards = async abortSignal => await CRUD('READ', [
    'api', process.env.REACT_APP_CUSTOMER, 'paymentMethod'
], {}, { signal: abortSignal });

export const getIntent = async abortSignal => await CRUD('READ', [
    'api', process.env.REACT_APP_CUSTOMER, 'paymentMethod', 'intent'
], {}, { signal: abortSignal });

export const saveMethodPayment = async (methodPayment, abortSignal) => await CRUD('CREATE', [
    'api', process.env.REACT_APP_CUSTOMER, 'paymentMethod'
], { ID: methodPayment }, { signal: abortSignal });

export const deleteMethodPayment = async (methodPayment, abortSignal) => await CRUD('DELETE', [
    'api', process.env.REACT_APP_CUSTOMER, 'paymentMethod'
], { ID: methodPayment }, { signal: abortSignal });

export const getCharges = async abortSignal => await CRUD('READ', [
    'api', process.env.REACT_APP_CUSTOMER, 'singleCharge'
], {}, { signal: abortSignal });
