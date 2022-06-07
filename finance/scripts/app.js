import { DOM } from './dom';
import { addCss } from './addCss';
import { Transaction } from './transaction';

export const app = {
    init() {
        Transaction.all.forEach((transaction, index) => {
            DOM.addTransaction(transaction, index);
        });

        document.querySelectorAll('img#edit').forEach(element => {
            element.addEventListener('click', e => {
                DOM.edit(e.target.classList);
            });
        });

        document.querySelectorAll('img#remove').forEach(element => {
            element.addEventListener('click', e => {
                Transaction.remove(e.target.classList);
            });
        });

        localStorage.setItem('dev.finances:transactions', JSON.stringify(Transaction.all));
        DOM.updateBalance();
        addCss.Css();
    },
    reload() {
        DOM.cleanUp();
        app.init();
    }
};