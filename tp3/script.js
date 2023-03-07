function notification(msg, bcgColor)
{
    const notif = document.createElement("div");
    const top = document.createElement('div');
    const closeIcon = document.createElement('i');

    const title = document.createElement('h6');
    const text = document.createTextNode(msg);

    title.innerHTML = 'NOTIFICATION';

    notif.classList.add('notif');
    top.classList.add('notif__top')
    closeIcon.classList.add('fa-solid', 'fa-xmark', 'notif__close-icon');

    title.classList.add('notif__title');

    notif.style.backgroundColor =
    typeof bcgColor !== 'undefined' ? bcgColor : 'white';
    notif.style.color = bcgColor !== 'white' ? 'white' : 'black';

    top.appendChild(closeIcon);
    top.appendChild(title);
    notif.appendChild(top);
    notif.appendChild(text);

    document.querySelector('.notifs').appendChild(notif);

    closeIcon.addEventListener('click', function() {
        notif.style.display = "none";
    });

    setTimeout(() => {
        notif.style.display = 'none';
    }, 1000);
}

var btns = document.getElementsByClassName('btn');
for (let i = 0; i < btns.length; i ++)
    btns[i].addEventListener('click', () => {
        let bcgColor = btns[i].classList.contains('btn--success')
        ? 'green' : (btns[i].classList.contains('btn--warning')
        ? 'yellow' : (btns[i].classList.contains('btn--danger')
        ? 'red' : (btns[i].classList.contains('btn--info')
        ? 'blue' : 'white')));
        let msg = bcgColor == 'green'
        ? 'Notification verte' : ( bcgColor == 'red'
        ? 'Notification rouge' : ( bcgColor == 'yellow'
        ? 'Notification jaune' : ( bcgColor == 'blue'
        ? 'Notification bleue' : 'Une notifiaction')));

        notification(msg, bcgColor);
    });
