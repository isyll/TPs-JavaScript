window.onload = (function() {
    'use strict';

    let generateButton = document.getElementById('generate-password');
    let pwdContainer = document.getElementById('pwd-generated');

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
        let bcg = document.createElement('div');
        let modal = document.createElement('div');
        let closeModal = document.createElement('div');
        let removeModalWindow = () => bcg.style.display = 'none';

        bcg.setAttribute('id', 'modal-background');
        modal.setAttribute('id','modal');
        closeModal.setAttribute('id', 'close-modal');
        closeModal.textContent = 'CLOSE';

        modal.appendChild(closeModal);
        bcg.appendChild(modal);
        document.body.appendChild(bcg);
        modal.textContent = text;
        modal.focus({preventScroll:false});

        modal.addEventListener('focusout', removeModalWindow);
        closeModal.addEventListener('click', removeModalWindow);
        modal.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') removeModalWindow();
        });
    }

    generateButton.addEventListener('click', (e) => {
        if ( ! pwdOptions.total() )
        {
            //modalWindow("Vous devez d'abord indiquer une option...");
            alert("Vous devez d'abord indiquer une option...");
        }
        else if (! pwdOptions.checkLength() )
        {
            //modalWindow("Vous devez indiquer un nombre inférieur à 20...");
            alert("La longueur est invalide...");
        }
        else if (pwdOptions.total() === 1
            && (parseInt(pwdOptions.length.value) >= 15
            && parseInt(pwdOptions.length.value) <= 20))
        {
            //modalWindow("Vous devez cocher au moins une option...");
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
        }
    });
})();
