
function removeComponentFromTrashIcon(e)
{
    return e.parentNode.parentNode.parentNode.parentNode
    .removeChild(e.parentNode.parentNode.parentNode);
}

function addNote()
{
    var components = document.querySelector('.components');

    var element = document.createElement("div");
    var element__head = document.createElement("div");
    var textarea = document.createElement("textarea");
    var head__icons = document.createElement('div');

    var icon__trash = document.createElement('i');
    var icon__edit = document.createElement('i');

    icon__trash.classList.add("fa-solid");
    icon__trash.classList.add("icon");
    icon__trash.classList.add("icon-trash");
    icon__trash.classList.add("fa-trash-can");

    icon__edit.classList.add("fa-solid");
    icon__edit.classList.add("icon");
    icon__edit.classList.add("icon-edit");
    icon__edit.classList.add("fa-pen-to-square");

    element.classList.add('component');
    textarea.classList.add('component__textarea');
    element__head.classList.add("component__head");
    head__icons.classList.add("head__icons");

    head__icons.appendChild(icon__edit);
    head__icons.appendChild(icon__trash);

    element__head.appendChild(head__icons);
    element.appendChild(element__head);
    element.appendChild(textarea);

    components.appendChild(element);

    icon__trash.addEventListener('click', () => {
        element.parentNode.removeChild(element);
    });

    icon__edit.addEventListener('click', () => {
        textarea.readOnly = !textarea.readOnly;
    });

}

document.querySelector(".add-note__button").onclick = addNote;
