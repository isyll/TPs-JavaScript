var component = document.createElement("div");
var component__head = document.createElement("div");
var component__textarea = document.createElement("textarea");

var head__icons = document.createElement("div");
var icons = document.createElement("i");

icons.className = "fa-solid";
icons.classList.add("fa-pen-to-square");
head__icons.appendChild(icons);
component__head.appendChild(head__icons);

component.className = "component";
component__head.className = "component__head";
component__textarea.className = "component__textarea";

component.appendChild(component__head);
component.appendChild(component__textarea);

document.getElementsByClassName("components").appendChild(component);
alert("ok");
