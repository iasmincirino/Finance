export const utils = {
    formatAmount(amount) {
        amount = amount * 100;
        return Math.round(amount);
    },
    format(date) {
        const DATE = date.split('-');
        return `${DATE[2]}/${DATE[1]}/${DATE[0]}`;
    },
    reverseDate(reducerDate) {
        const change = reducerDate.split('/');
        return `${change[2]}-${change[1]}-${change[0]}`;
    },
    formatCurrency(value) {
        const signal = Number(value) < 0 ? '-' : '';
        //o signal recebe um value do tipo number se for <0 entao(? = entao) recebe "-" senao(: = senao) recebe ""
        value = String(value).replace(/\D/g, '');
        value = Number(value) / 100;
        value = value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        return signal + value;
    }
};