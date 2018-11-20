var cajadatos, bd;
function iniciar() {
    cajadatos = document.getElementById("cajadatos");
    var boton = document.getElementById("buscar");
    boton.addEventListener("click", buscarobjetos);

    var solicitud = indexedDB.open("basededatos");
    solicitud.addEventListener("error", mostrarerror);
    solicitud.addEventListener("success", comenzar);
    solicitud.addEventListener("upgradeneeded", crearbd);
}
function mostrarerror(evento) {
    alert("Error: " + evento.code + " " + evento.message);
}
function comenzar(evento) {
    bd = evento.target.result;
}
function crearbd(evento) {
    var basededatos = evento.target.result;
    var almacen = basededatos.createObjectStore("peliculas", {keyPath: "id"});
    almacen.createIndex("BuscarFecha", "fecha", {unique: false});
}
function buscarobjetos() {
    cajadatos.innerHTML = "";
    var buscar = document.getElementById("fecha").value;

    var transaccion = bd.transaction(["peliculas"]);
    var almacen = transaccion.objectStore("peliculas");
    var indice = almacen.index("BuscarFecha");
    var rango = IDBKeyRange.only(buscar);

    var puntero = indice.openCursor(rango);
    puntero.addEventListener("success", mostrarlista);
}
function mostrarlista(evento) {
    var puntero = evento.target.result;
    if (puntero) {
        cajadatos.innerHTML += "<div>" + puntero.value.id + " - " + puntero.value.nombre + " - " + puntero.value.fecha + "</div>";
        puntero.continue();
    }
}
window.addEventListener("load", iniciar);
