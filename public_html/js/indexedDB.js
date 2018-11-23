
window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;

//prefixes of window.IDB objects
window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange

if (!window.indexedDB) {
    window.alert("Your browser doesn't support a stable version of IndexedDB.")
}


var db;
var request = window.indexedDB.open("rentg02", 1);

request.onerror = function (event) {
    console.log("error: ");
};

request.onsuccess = function (event) {
    db = request.result;
    console.log("success: " + db);
};

request.onupgradeneeded = function (event) {
    var db = event.target.result;
    var objectStore = db.createObjectStore("coches", {keyPath: "matricula"});
    objectStore.createIndex('by_matricula', 'matricula', {unique: true});
    objectStore.createIndex('by_marca', 'marca', {unique: false});

    var objectStore = db.createObjectStore("clientes", {keyPath: "dni"});
    objectStore.createIndex('by_name', 'name', {unique: false});
    objectStore.createIndex('by_email', 'email', {unique: true});
    objectStore.createIndex('by_contraseña', 'contraseña', {unique: false});
    objectStore.createIndex('by_dni', 'dni', {unique: true});
    objectStore.createIndex('by_movil', 'movil', {unique: true});

    var objectStore = db.createObjectStore("reservas", {keyPath: "id", autoIncrement: true});
    objectStore.createIndex('by_id', 'id', {unique: true});
    objectStore.createIndex('by_email', 'email', {unique: true});
    objectStore.createIndex('by_matricula', 'matricula', {unique: true});
    objectStore.createIndex('by_fechaInicio', 'fechaInicio', {unique: false});
    objectStore.createIndex('by_horaInicio', 'horaInicio', {unique: false});
    objectStore.createIndex('by_fechaFin', 'fechaFin', {unique: false});
    objectStore.createIndex('by_horaFin', 'horaFin', {unique: false});
    objectStore.createIndex('by_lugar', 'lugar', {unique: false});

}

function addCoches() {
    var pmatricula = document.getElementById('matricula').value;
    var pmarca = document.getElementById('marca').value;
    var request = db.transaction(["coches"], "readwrite")
            .objectStore("coches")
            .add({matricula: pmatricula,
                marca: pmarca});

    request.onsuccess = function (event) {
        alert("Info añadida a la BD correctamente.");
    };

    request.onerror = function (event) {
        alert("Error. Los datos ya existen en la base de datos.");
    };

}
function addCliente() {
    var pemail = document.getElementById('email').value;
    var pcontraseña = document.getElementById('contraseña').value;
    var pnombre = document.getElementById('nombre').value;
    var pdni = document.querySelector('dni').value;
    var pmovil = document.getElementById('movil').value;
    var request = db.transaction(["cliente"], "readwrite")
            .objectStore("cliente")
            .add({email: pemail, contraseña: pcontraseña, nombre: pnombre, dni: pdni, movil: pmovil});

    request.onsuccess = function (event) {
        alert("Info añadida a la BD correctamente.");
    };

    request.onerror = function (event) {
        alert("Error. Los datos ya existen en la base de datos.");
    };

}
function addReservas() {
    var pId = document.getElementById('id').value;
    var pEmail = document.getElementById('email').value;
    var pMatricula = document.getElementById('matricula').value;
    var pFechaInicio = document.getElementById('fechaInicio').value;
    var pHoraInicio = document.getElementById('horaInicio').value;
    var pFechaFin = document.getElementById('fechaFin').value;
    var pHoraFin = document.getElementById('horaFin').value;
    var pLugar = document.getElementById('lugar').value;

    var transaction = db.transaction(["medico"]);
    var objectStore = transaction.objectStore("medico");
    var getPermanent = objectStore.get(numcol);
    getPermanent.onsuccess = function () {

    };

}



//var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
//
//var dataBase = null;
//
//function iniciar() {
//    //Abre la conexion a la BD o la crea si no lo ha hecho anteriormente
//    var dataBase = indexedDB.open("rentG02", 1);
//
//    dataBase.onupgradeneeded = function (e) {
//        // The database did not previously exist, so create object stores and indexes.
//        var db = dataBase.result;
//        var coches = db.createObjectStore("coches", {keyPath: "matricula"});
//        var reservas = db.createObjectStore("reservas", {keyPath: "id", autoIncrement: true});
//        var clientes = db.createObjectStore("clientes", {keyPath: "dni"});
//
//
//        var matriculaIndex = coches.createIndex("by_matricula", "matricula", {unique: true});
//        var marcaIndex = coches.createIndex("by_marca", "marca");
//
//        var idIndex = reservas.createIndex("by_id", "id");
//        var emailIndex = reservas.createIndex("by_email", "email");
//        var matriculaIndex = reservas.createIndex("by_matricula", "matricula");
//        var fechaIniIndex = reservas.createIndex("by_fechaIni", "fechaIni");
//        var horaIniIndex = reservas.createIndex("by_horaIni", "horaIni");
//        var fechaFinIndex = reservas.createIndex("by_fechaFin", "fechaFin");
//        var horaFinIndex = reservas.createIndex("by_horaFin", "horaFin");
//        var lugarIndex = reservas.createIndex("by_lugar", "lugar");
//
//        var emailIndex = clientes.createIndex("by_email", "email");
//        var matriculaIndex = clientes.createIndex("by_matricula", "matricula");
//        var nombreIndex = clientes.createIndex("by_nombre", "nombre");
//        var dniIndex = clientes.createIndex("by_dni", "dni");
//        var movilIndex = clientes.createIndex("by_movil", "movil");
//
//
//    };
//
//    //Carga correcta
//    dataBase.onsuccess = function (e) {
//        alert('Database loaded');
//    };
//
//    //Carga fallida
//    dataBase.onerror = function (e) {
//        alert('Error loading database');
//    };
//}
//
//function add() {
//    var active = dataBase.result;
//
//    var data = active.transaction(["clientes"], "readwrite");
//
//}
//
