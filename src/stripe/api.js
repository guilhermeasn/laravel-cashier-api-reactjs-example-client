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

export const saveMethodPayment = async methodPayment => await CRUD('CREATE', [
    'api', process.env.REACT_APP_CUSTOMER, 'paymentMethod'
], { ID: methodPayment });

export const deleteMethodPayment = async methodPayment => await CRUD('DELETE', [
    'api', process.env.REACT_APP_CUSTOMER, 'paymentMethod'
], { ID: methodPayment });

export const getCharges = async abortSignal => await CRUD('READ', [
    'api', process.env.REACT_APP_CUSTOMER, 'singleCharge'
], {}, { signal: abortSignal });

export const charge = async (description, price, method) => await CRUD('CREATE', [
    'api', process.env.REACT_APP_CUSTOMER, 'singleCharge'
], { description, price, method });

export const getSubscriptions = async abortSignal => await CRUD('READ', [
    'api', process.env.REACT_APP_CUSTOMER, 'subscription'
], {}, { signal: abortSignal });

export const getPlans = async abortSignal => await CRUD('READ', [
    'api', 'price'
], { subscriptions: true }, { signal: abortSignal });

export const subscribe = async (id, method) => await CRUD('CREATE', [
    'api', process.env.REACT_APP_CUSTOMER, 'subscription'
], { id, method });

export const cancelSubscribe = async id => await CRUD('DELETE', [
    'api', process.env.REACT_APP_CUSTOMER, 'subscription'
], { id });
