import { app } from './app';
import { form } from './form';



/* export const storage = {
    get() {
        return JSON.parse(localStorage.getItem('dev.finances:transactions')) || [];
    },
    set(transactions) {
        localStorage.setItem('dev.finances:transactions', JSON.stringify(transactions))
    }
} */

const Modal = {
    open() {
        document.querySelector('.modal-overlay').classList.add('active');
    },
    close() {
        document.querySelector('.modal-overlay').classList.remove('active');
        form.clearFields();
    }
};

const layer = {
    open() {
        document.querySelector('.layerMensage').classList.add('active');
    },
    close() {
        document.querySelector('.layerMensage').classList.remove('active');
    }
};

setTimeout(() => {
    const classAnimated = document.querySelectorAll('.animated');
    classAnimated.forEach(element => {
        element.classList.remove('animated');
    });
}, 1000);
window.addEventListener('click', e => {
    if (e.target.className === 'new button') { Modal.open(); }
    if (e.target.className === 'newTransaction' || e.target.className === 'newTransactionImg') { Modal.open(); }
    if (e.target.className === 'button cancel') { Modal.close(); }
    if (e.target.className === 'layerMensage active') { layer.close(); }
});

document.querySelector('#form').addEventListener('submit', e => { form.submit(e); });

app.init();
export { layer, Modal };