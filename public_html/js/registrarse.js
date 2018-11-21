/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var cajadatos;
function iniciar() {
    cajadatos = document.getElementById("cajadatos");
    var archivos = document.getElementById("archivos");
    archivos.addEventListener("change", procesar);
}
function procesar(evento) {
    var archivos = evento.target.files;
    cajadatos.innerHTML = "";

    var archivo = archivos[0];
    if (!archivo.type.match(/image.*/i)) {
        alert("Insertar una imagen");
    } else {
        cajadatos.innerHTML += "Nombre: " + archivo.name + "<br>";
        cajadatos.innerHTML += "Tamaño: " + archivo.size + " bytes<br>";
        var lector = new FileReader();
        lector.addEventListener("load", mostrar);
        lector.readAsDataURL(archivo);
    }
}
function mostrar(evento) {
    var resultado = evento.target.result;
    cajadatos.innerHTML += '<img src="' + resultado + '">';
}
window.addEventListener("load", iniciar);