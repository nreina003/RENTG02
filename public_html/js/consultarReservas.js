var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
window.addEventListener("load", cargar);
function cargar(){
    iniciar();
    saludo();
    mostrarReserva();
}

function iniciar(){
    var cs=document.getElementById("logoff").addEventListener("click", cerrarSesion);
    
}

function cerrarSesion(){
    sessionStorage.setItem("nomLogeado","");
    location.href = "index.html";
}






