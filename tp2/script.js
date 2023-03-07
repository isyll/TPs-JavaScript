(function () {
    const leftSide = document.getElementById('left-side');
    const rightSide = document.getElementById('right-side');
    const moveLeftButton = document.getElementById('move-left');
    const moverighttButton = document.getElementById('move-right');

    function generer()
    {
        const texts = [
            "Mon premier",
            "Mon deuxieme",
            "Mon troisieme",
            "Mon quatrieme"
        ];

        for (let i = 0; i < texts.length; i ++)
        {
            let p = document.createElement('p');
            p.classList.add('para');
            p.appendChild(document.createTextNode(texts[i]));
            leftSide.append(p);
            texts[i] = p;
        }

        return texts;
    }

    function selectParagraph(list, event)
    {
        for (let i = 0; i < list.length; i ++)
            list[i].addEventListener(event, () => {
                for (let j = 0; j < list.length; j ++)
                    list[j].classList.remove("active");
                list[i].classList.add("active");
            });
    }

    function disableButton()
    {
        if (!rightSide.hasChildNodes())
            moveLeftButton.setAttribute('disabled', '');
        else
            moveLeftButton.removeAttribute('disabled');

        if (!leftSide.hasChildNodes())
            moverighttButton.setAttribute('disabled', '');
        else
            moverighttButton.removeAttribute('disabled');
    }

    function moveEvent(select, side)
    {
        select.addEventListener('click', () => {
            let ps = document.getElementsByClassName("para");
            for (let i = 0; i < ps.length; i ++)

                if (ps[i].classList.contains('active'))
                {
                    side.appendChild(ps[i]);
                    break;
                }
        });
    }

    const ps = generer();
    selectParagraph(ps, 'mouseover');
    setInterval(disableButton, 100);
    moveEvent(moveLeftButton, leftSide);
    moveEvent(moverighttButton, rightSide);
})();
