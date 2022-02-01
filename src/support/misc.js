

export const preparePriceStripe = amount => {

    amount = amount.replace(',', '.').replace(/[^\d.]/, '');
    amount = parseFloat(amount).toFixed(2);
    
    if(/\./.test(amount)) amount = amount.replace('.', '');
    else amount = amount * 100;

    return amount;
    
}

