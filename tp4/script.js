window.onload = (function() {
    'use strict';

    const pwdLength = {min: 1, max: 20};

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
            return pwdOptions.length.value.length
            && ! isNaN(pwdOptions.length.value)
            && parseInt(pwdOptions.length.value) <= pwdLength.max
            && parseInt(pwdOptions.length.value) >= pwdLength.min;
        },

        verifyCheckeds : () => {
            // return pwdOptions.checkLength()
            // && pwdOptions.total() - 1 > parseInt(pwdOptions.length.value);
            return (pwdOptions.total()-1) <= parseInt(pwdOptions.length.value);
        }
    };

    function modalWindow(text)
    {
        const mw = {
            bcg : document.createElement('div'),
            modal : document.createElement('div'),
            modalContent : document.createElement('div'),
            closeModal : document.createElement('button'),
            closeModalContent : document.createElement('i'),

            init : function() {
                this.bcg.setAttribute('id', 'modal-background');
                this.modal.setAttribute('id','modal');
                this.closeModal.setAttribute('id', 'close-modal');
                this.modalContent.setAttribute('id', 'modal-content');
                this.closeModalContent.classList.add('fa-solid', 'fa-x');
                // this.closeModal.textContent = 'Fermer';

                this.modalContent.textContent = text;
                this.closeModal.appendChild(this.closeModalContent);
                this.modal.appendChild(this.modalContent);
                this.modal.appendChild(this.closeModal);
                this.bcg.appendChild(this.modal);
                document.body.appendChild(this.bcg);

                setTimeout(() => {
                    document.body.removeChild(this.bcg);
                }, 1500);

                this.closeModal.addEventListener('click', () => {
                    this.removeModalWindow();
                });
                document.addEventListener('keydown', (e) => {
                    if (e.key === 'Escape') this.removeModalWindow();
                });
                this.bcg.addEventListener('click', (e) => {
                    if (e.target === this.bcg) this.removeModalWindow();
                });
            },

            removeModalWindow : function() {
                this.bcg.style.visibility = 'hidden';
                this.bcg.style.display = 'none';
            }
        }

        mw.init();        
    }

    generateButton.addEventListener('click', (e) => {
        if ( ! pwdOptions.total() )
            modalWindow("Vous devez d'abord indiquer une option...");
        else if ( ! pwdOptions.checkLength() )
            modalWindow("La longueur est invalide...");
        else if (pwdOptions.checkLength() && pwdOptions.total() === 1)
            modalWindow("Vous devez cocher au moins une option...");
        else if ( ! pwdOptions.verifyCheckeds())
            modalWindow("Le nombre d'options est supérieur à la longueur...");
        else
        {
            let length = pwdOptions.length.value.length
            ? parseInt(pwdOptions.length.value) : 15 + Math.floor(Math.random() * 5),
            pwd = '';

            let shuffle = (str) => {
                str = str.split('');
                for (let i = str.length - 1; i > 0; i--) {
                    let j = Math.floor(Math.random() * (i+1));
                    [str[i], str[j]] = [str[j], str[i]];
                }
                return str.join('');
            };

            let chars = [
                pwdOptions.uppers.checked  ? shuffle('ABCDEFGHIJKLMNOPQRSTUVWXYZ') : '',
                pwdOptions.lowers.checked  ? shuffle('abcdefghijklmnopqrstuvwxyz') : '',
                pwdOptions.numbers.checked ? shuffle('0123456789') : '',
                pwdOptions.symbols.checked ? shuffle('~!@#$%^&*_+-=?./;') : ''
            ].filter((e) => e.length);

            for (let i = 0, l = chars.length; i < length; i++)
                pwd += chars[i%l][Math.floor(Math.random() * chars[i%l].length)];

            pwdContainer.textContent = shuffle(pwd);

            let cpyBtn = document.createElement('button'),
            cpyBtnIcon = document.createElement('i');

            cpyBtn.classList.add('copy-button')
            cpyBtnIcon.classList.add('fa-light', 'fa', 'fa-copy');
            cpyBtn.appendChild(cpyBtnIcon);
            containerTop.append(cpyBtn);

            cpyBtn.addEventListener('click', (e) => {
                navigator.clipboard.writeText(pwdContainer.textContent);
                modalWindow('Mot de passe copié');
            });
        }
    });
})();
