window.onload = (function() {
    'use strict';

    let generateButton = document.getElementById('generate-password');
    let pwdContainer = document.getElementById('pwd-generated');
    let containerTop = document.querySelector('.container__top');

    let pwdOptions = {
        length: document.getElementById('pwd-len'),
        uppers: document.getElementById('contains-uppers'),
        lowers: document.getElementById('contains-lowers'),
        numbers: document.getElementById('contains-numbers'),
        symbols: document.getElementById('contains-symbols'),

        total : () => {
            return (pwdOptions.length.value.length ? 1 : 0)
            + (pwdOptions.uppers.checked ? 1 : 0)
            + (pwdOptions.lowers.checked ? 1 : 0)
            + (pwdOptions.numbers.checked ? 1 : 0)
            + (pwdOptions.symbols.checked? 1 : 0);
        },

        checkLength : () => {
            return ! (parseInt(pwdOptions.length.value) > 20
            || parseInt(pwdOptions.length.value) < 15);
        }
    };

    function modalWindow(text)
    {
        const mw = {
            bcg : document.createElement('div'),
            modal : document.createElement('div'),
            modalContent : document.createElement('div'),
            closeModal : document.createElement('button'),

            init : function() {
                this.bcg.setAttribute('id', 'modal-background');
                this.modal.setAttribute('id','modal');
                this.closeModal.setAttribute('id', 'close-modal');
                this.modalContent.setAttribute('id', 'modal-content');
                this.closeModal.textContent = 'Fermer';

                this.modalContent.textContent = text;
                this.modal.appendChild(this.modalContent);
                this.modal.appendChild(this.closeModal);
                this.bcg.appendChild(this.modal);
                document.body.appendChild(this.bcg);

                // setTimeout(() => {
                //     document.body.removeChild(this.bcg);
                // }, 1000);

                this.closeModal.addEventListener('click', () => {
                    this.removeModalWindow();
                });
                document.addEventListener('keydown', (e) => {
                    if (e.key === 'Escape') this.removeModalWindow();
                });
                this.bcg.addEventListener('click', (e) => {
                    if (e.target !== this.modal)
                        this.removeModalWindow();
                });
            },

            removeModalWindow : function() {
                this.bcg.style.visibility = 'hidden';
                this.bcg.style.display = 'none';
            }
        }

        mw.init();        
    }

    function notification(text) {

    }

    generateButton.addEventListener('click', (e) => {
        if ( ! pwdOptions.total() )
        {
            modalWindow("Vous devez d'abord indiquer une option...");
        }
        else if (! pwdOptions.checkLength() )
        {
            modalWindow("La longueur est invalide...");
        }
        else if (pwdOptions.total() === 1
            && (parseInt(pwdOptions.length.value) >= 15
            && parseInt(pwdOptions.length.value) <= 20))
        {
            modalWindow("Vous devez cocher au moins une option...");
        }
        else
        {
            let length = pwdOptions.length.value.length
            ? parseInt(pwdOptions.length.value) : 15 + Math.floor(Math.random() * 5);

            let shuffle = (str) => {
                str = str.split('');
                for (let i = str.length - 1; i > 0; i--) {
                    let j = Math.floor(Math.random() * (i+1));
                    [str[i], str[j]] = [str[j], str[i]];
                }
                return str.join('');
            }
    
            let chars = [
                pwdOptions.uppers.checked ? shuffle('ABCDEFGHIJKLMNOPQRSTUVWXYZ') : '',
                pwdOptions.lowers.checked ? shuffle('abcdefghijklmnopqrstuvwxyz') : '',
                pwdOptions.numbers.checked ? shuffle('01234567890123456789012789') : '',
                pwdOptions.symbols.checked ? shuffle('~!@#$%^&*()_+-={}[]:;?,./;') : '',
            ]

            pwdContainer.textContent = shuffle(chars.join('')).substring(0, length);
            let cpyBtn = document.createElement('button');
            cpyBtn.textContent = 'Copier';
            cpyBtn.classList.add('copy-button');
            containerTop.append(cpyBtn);
            cpyBtn.addEventListener('click', (e) => {
                navigator.clipboard.writeText(pwdContainer.textContent);
                modalWindow('Mot de passe copié');
            });
        }
    });
})();
