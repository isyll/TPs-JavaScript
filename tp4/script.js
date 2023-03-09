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
        const bcg = document.createElement('div');
        const modal = document.createElement('div');
        const closeModal = document.createElement('button');
        const removeModalWindow = () => bcg.style.display = 'none';

        bcg.setAttribute('id', 'modal-background');
        modal.setAttribute('id','modal');
        closeModal.setAttribute('id', 'close-modal');
        closeModal.textContent = 'CLOSE';
        closeModal.style.zIndex = 1000;

        modal.appendChild(closeModal);
        bcg.appendChild(modal);
        document.body.appendChild(bcg);
        modal.textContent = text;

        closeModal.addEventListener('click', removeModalWindow);
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') removeModalWindow();
        });
    }

    generateButton.addEventListener('click', (e) => {
        if ( ! pwdOptions.total() )
        {
            alert("Vous devez d'abord indiquer une option...");
        }
        else if (! pwdOptions.checkLength() )
        {
            alert("La longueur est invalide...");
        }
        else if (pwdOptions.total() === 1
            && (parseInt(pwdOptions.length.value) >= 15
            && parseInt(pwdOptions.length.value) <= 20))
        {
            alert("Vous devez cocher au moins une option...");
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
                pwdOptions.uppers.checked ? 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' : '',
                pwdOptions.lowers.checked ? 'abcdefghijklmnopqrstuvwxyz' : '',
                pwdOptions.numbers.checked ? '01234567890123456789012789' : '',
                pwdOptions.symbols.checked ? '~!@#$%^&*()_+-={}[]:;?,./;' : '',
            ]

            pwdContainer.textContent = shuffle(chars.join('')).substring(0, length);
            let cpyBtn = document.createElement('button');
            cpyBtn.textContent = 'Copier';
            cpyBtn.classList.add('copy-button');
            containerTop.append(cpyBtn);
            cpyBtn.addEventListener('click', (e) => {
                navigator.clipboard.writeText(pwdContainer.textContent);
                alert('Mot de passe copié');
            });
        }
    });
})();
