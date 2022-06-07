import { app } from './app';
import { layer } from './index';

let limit = 0;
export const Transaction = {
    all: JSON.parse(localStorage.getItem('dev.finances:transactions')) || [],
    add(transaction) {
        Transaction.all.push(transaction);
        app.reload();
    },
    remove(index) {
        Transaction.all.splice(
            index, /* elemento que sera usado */
            1 /* quantidade de elementos */
        );
        app.reload(); /* o app reload foi usado por causa do cleanUp e para rodar novamente o init() */

    },
    incomes() {
        let income = 0;
        Transaction.all.forEach(
            transaction => {
                if (transaction.amount > 0) {
                    income = income + transaction.amount;
                }
            });
        return income;
    },
    expenses() {
        let expense = 0;
        Transaction.all.forEach(transaction => {
            if (transaction.amount < 0) {
                expense = expense + transaction.amount;
            }
        });
        return expense;
    },
    total() {
        let total = Transaction.incomes() + Transaction.expenses();
        check(total);
        return total;
    },
};
const check = total => {
    const totalCard = document.querySelector('.card.total');
    if (total < 0 && limit <= 3) {
        totalCard.classList.add('changeColor');
        setTimeout(layer.open, 500);
        limit++;
    } else if (total < 0) {
        totalCard.classList.add('changeColor');
    } else {
        totalCard.classList.remove('changeColor');
    }
};