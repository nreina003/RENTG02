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
    var objectStore = db.createObjectStore("clientes", {keyPath: "dni"});
    var objectStore = db.createObjectStore("reservas", {keyPath: "id", autoIncrement: true});
 

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
            .add({email:pemail, contraseña: pcontraseña, nombre: pnombre,dni:pdni, movil:pmovil });

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

function addCita() {

    var pSanitario = document.getElementById('inputdatalistsanitario').value;
    var pFecha = document.getElementById('fechacita').value;
    var pHora = document.getElementById('inputdatalisthora').value;
    var pMin = document.getElementById('inputdatalistmins').value;
    //var pN = 1;

    var request = db.transaction(["cita"], "readwrite")
            .objectStore("cita")
            .add({
                //n: pN + 1,
                sanitario: pSanitario,
                fecha: pFecha,
                hora: pHora + pMin});

    request.onsuccess = function (event) {
        alert("Info añadida a la BD correctamente.");
    };

    request.onerror = function (event) {
        alert("Error. Los datos ya existen en la base de datos.");
    };
}