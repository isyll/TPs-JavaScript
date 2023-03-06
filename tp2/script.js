const leftSide = document.getElementById('left-side');
const rightSide = document.getElementById('right-side');
const btns = document.getElementsByClassName("move-buttons");
const move_left = document.getElementById('move-left');
const move_right = document.getElementById('move-right');

const texts = [
    "Mon premier",
    "Mon deuxieme",
    "Mon troisieme",
    "Mon quatrieme"
];

function disableButton()
{
    if (!rightSide.hasChildNodes())
        move_left.setAttribute('disabled', '');
    else
        move_left.removeAttribute('disabled');

    if (!leftSide.hasChildNodes())
        move_right.setAttribute('disabled', '');
    else
        move_right.removeAttribute('disabled');
}


for (let i = 0; i < texts.length; i ++)
{
    let p = document.createElement('p');
    p.appendChild(document.createTextNode(texts[i]));
    leftSide.append(p);

    texts[i] = p;
}

for (let i = 0; i < texts.length; i ++)
    texts[i].addEventListener("mouseover", () => {
        for (let j = 0; j < texts.length; j ++)
            texts[j].classList.remove('active');
        texts[i].classList.add('active');
    });

disableButton();

move_left.addEventListener('click', function() {
    if (rightSide.hasChildNodes())
        for (let i = 0; i < texts.length; i ++)
            if (texts[i].classList.contains('active'))
            {
                leftSide.appendChild(texts[i]);
                break;
            }
    disableButton();
});

move_right.addEventListener('click', function() {
    if (leftSide.hasChildNodes())
        for (let i = 0; i < texts.length; i ++)
            if (texts[i].classList.contains('active'))
            {
                rightSide.appendChild(texts[i]);
                break;
            }
    disableButton();
});
