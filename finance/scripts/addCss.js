import { Transaction } from './transaction';
export const addCss = {
    Css() {
        const sizeTable = Transaction.all.length;
        const styleElement = document.createElement('style');
        const tagStyle = document.querySelector('.styleToNewTransaction');
        let cssRules = `
        .new.button{
            opacity: 1;
            visibility: visible;
        }
        #newTransaction{
            width: 1px;
            height: 1px;
            opacity: 0;
            visibility: hidden;
        }
        `;
        if (tagStyle) return;
        if (sizeTable >= 4) {
            styleElement.innerHTML = cssRules;
            styleElement.className = 'styleToNewTransaction';
            document.body.appendChild(styleElement);
        }
    }
};