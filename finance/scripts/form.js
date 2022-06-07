import { utils } from './utils';
import { Transaction } from './transaction';
import { Modal } from './index';
import { input } from './input';

export const form = {
    description: document.querySelector('input#description'),
    amount: document.querySelector('input#amount'),
    typeTransaction: document.getElementsByName('transaction-type'),
    date: document.querySelector('input#date'),

    getValue() {
        let typeTransactionValue = '';
        this.typeTransaction.forEach(element => {
            if (!element.checked) {
                return;
            }
            typeTransactionValue = element.value;
        });
        return {
            description: form.description.value,
            amount: form.amount.value,
            typeTransaction: typeTransactionValue,
            date: form.date.value,
        };

    },
    validateField() {
        const { description, amount, date } = this.getValue();
        if (description.trim() === '' ||
            amount.trim() === '' ||
            date.trim() === '') {
            throw new Error('Por favor, preencha todos os campos!');
        }
    },
    formatValues() {
        let { description, amount, typeTransaction, date } = this.getValue();
        amount = utils.formatAmount(amount);
        amount = typeTransaction === 'income' && amount < 0 ? amount * -1 : amount;
        amount = typeTransaction === 'expense' && amount > 0 ? amount - (2 * amount) : amount;
        date = utils.format(date);
        return { description, amount, typeTransaction, date };
    },
    clearFields() {
        form.description.value = '';
        form.amount.value = '';
        form.date.value = '';
    },
    submit(e) {
        e.preventDefault();
        try {
            form.validateField();
            const transaction = form.formatValues();
            Transaction.add(transaction);
            form.clearFields();
            Modal.close();
            input.clear();
        } catch (error) {
            setTimeout(() => {
                document.querySelector('.error').classList.add('active');
                document.querySelector('.error.active span').innerHTML = error.message;
                if (form.description.value.trim() == '') {
                    form.description.classList.add('red');
                }
                if (form.amount.value.trim() === '') {
                    form.amount.classList.add('red');
                }
                if (form.date.value.trim() === '') {
                    form.date.classList.add('red');
                }
            }, 0);
            setTimeout(() => {
                document.querySelector('.error').classList.remove('active');
                const removeBorder = document.querySelectorAll('.border.red');
                if (!removeBorder) {
                    removeBorder[0].classList.remove('red');
                    removeBorder[1].classList.remove('red');
                    removeBorder[2].classList.remove('red');
                }
            }, 3000);
        }
    },
};