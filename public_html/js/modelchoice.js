/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

window.addEventListener("load", iniciar, false);
function iniciar() {
    // primero la eleccion del coche 

    //oficina de recogida

    //fecha

    //hora

    //oficina de entrega

    //fecha

    //hora
}
function controlar(e) {
    var elemento = e.target;
    if (elemento.validity.valid) {
        elemento.style.background = '#FFFFFF';
    } else {
        elemento.style.background = '#FFDDDD';
    }
}
function validacion(e) {
    //var elemento=e.target;
    //elemento.style.background='#FFDDDD';

}
function enviar() {
    var valido = document.formaltapac.checkValidity();
    if (valido) {
        addCliente();
        document.formaltapac.submit();
}
}
