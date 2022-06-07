import { Transaction } from './transaction';
import { form } from './form';
import { Modal } from './index';
import { input } from './input';
import { utils } from './utils';

export const DOM = {
    tableBody: document.querySelector('#data-table tbody'),
    addTransaction(transaction, index) {
        const tr = document.createElement('tr');
        tr.innerHTML = this.innerHTMLTransaction(transaction, index);
        tr.dataset.index = index;
        DOM.tableBody.appendChild(tr);
    },
    edit(index) {
        Modal.open();
        let { description, amount, typeTransaction, date } = Transaction.all[index];
        form.description.value = description;
        form.amount.value = amount / 100;
        form.date.value = utils.reverseDate(date);
        if (typeTransaction === 'income') {
            document.getElementById('income').setAttribute('checked', '');
        } else {
            document.getElementById('expense').setAttribute('checked', '');
        }
        input.addInput(index);
    },
    innerHTMLTransaction(transaction, index) {
        const CSS = transaction.amount > 0 ? 'income' : 'expense'; //uso do se e senão
        const Amount = utils.formatCurrency(transaction.amount);
        const html = `
        <td class="description">${(transaction.description)}</td>
        <td class= "${CSS}">${Amount}</td>
        <td class="date">${transaction.date}</td>
        <td><img src="./assets/pencil.svg" alt="Modifique esta transação" id="edit" class="${index}"></td>
        <td><img src="./assets/minus.svg" alt="Remover esta transação" id="remove" class="${index}"></td>`;
        return html;
    },
    updateBalance() {
        document.getElementById('cardIncome').innerHTML = utils.formatCurrency(Transaction.incomes());
        document.getElementById('cardExpense').innerHTML = utils.formatCurrency(Transaction.expenses());
        document.getElementById('cardTotal').innerHTML = utils.formatCurrency(Transaction.total());
    },
    cleanUp() {
        this.tableBody.innerHTML = '';
    }
};