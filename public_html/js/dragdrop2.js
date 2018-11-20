/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var fuente, deposito;
function iniciar() {
    fuente = document.getElementById("imagen");
    fuente.addEventListener("dragstart", arrastrar);
    fuente.addEventListener("dragend", finalizar);

    deposito = document.getElementById("deposito");
    deposito.addEventListener("dragenter", entrar);
    deposito.addEventListener("dragleave", salir);
    deposito.addEventListener("dragover", function (evento) {
        evento.preventDefault();
    });
    deposito.addEventListener("drop", soltar);
}
function entrar(evento) {
    evento.preventDefault();
    deposito.style.background = "rgba(0, 150, 0, .2)";
}
function salir(evento) {
    evento.preventDefault();
    deposito.style.background = "#FFFFFF";
}
function finalizar(evento) {
    elemento = evento.target;
    elemento.style.visibility = "hidden";
}
function arrastrar(evento) {
    var codigo = '<img src="' + fuente.src + '">';
    evento.dataTransfer.setData("Text", codigo);
}
function soltar(evento) {
    evento.preventDefault();
    deposito.style.background = "#FFFFFF";
    deposito.innerHTML = evento.dataTransfer.getData("Text");
}
window.addEventListener("load", iniciar);


