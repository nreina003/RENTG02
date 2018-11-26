window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;

//prefixes of window.IDB objects
window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange

// Se comprueba que tu navegador soporte la version de indexedDB.

if (!window.indexedDB) {
    window.alert("Your browser doesn't support a stable version of IndexedDB.")
}
var dataBase;

//Función addResponsable creara un responsable predefinido en la BD de IndexedDB.
function addResponsable() {
    var active = dataBase.result;
    var data = active.transaction(["clientes"], "readwrite");
    var object = data.objectStore("clientes");
    var request = object.put({
        nombre: "Responsable",
        email: "xabier@gmail.com",
        contraseña: "321",
        dni: "123987654",
        movil: "654321987"

    });
    request.onerror = function (e) {
        alert(request.error.nombre + '\n\n' + request.error.message);
    };
    data.oncomplete = function (e) {
        alert('Object successfully added');
    };
}

//Función addCoches creara cuatro coches predefinidos en la BD de IndexedDB.
function addCoches() {
    var active = dataBase.result;
    var data = active.transaction(["coches"], "readwrite");
    var object = data.objectStore("coches");
    var request = object.put({
        matricula: "1234 QWE",
        marca: "FORD"
    });
    request.onerror = function (e) {
        alert(request.error.matricula + '\n\n' + request.error.message);
    };
    data.oncomplete = function (e) {
        alert('Object successfully added');
    };
}

//La función addClientes añadira los datos recogidos del formulario de registrarse.html y la añadira en la BD de IndexedDB.
function addCliente() {
    var active = dataBase.result;
    var data = active.transaction(["clientes"], "readwrite");
    var object = data.objectStore("clientes");
    var request = object.put({
        nombre: document.querySelector("#nombre").value,
        email: document.querySelector("#email").value,
        contraseña: document.querySelector("#contraseña").value,
        dni: document.querySelector("#dni").value,
        movil: document.querySelector("#movil").value}
    );
    request.onsuccess = function (e) {
        alert("Info añadida a la BD correctamente");
    };
    request.onerror = function (e) {
        alert(request.error.nombre + '\n\n' + request.error.message);
    };

}

//function getCliente() {
//    var email = document.getElementById("email").value;
//
//    var active = dataBase.result;
//    var data = active.transaction(["clientes"], "readonly");
//    var object = data.objectStore("clientes");
//    var elements = [];
//
//    object.openCursor().onsuccess = function (e) {
//
//        var result = e.target.result;
//        if (result === null) {
//            return;
//        }
//        elements.push(result.value);
//        result.continue();
//
//    };
//    data.oncomplete = function () {
//        for (var key in elements) {
//            alert(elements[key].dni);
//        }
//        elements = [];
//    };
//
//}



//function addReservas() {
//    var pId = document.getElementById('id').value;
//    var pEmail = document.getElementById('email').value;
//    var pMatricula = document.getElementById('matricula').value;
//    var pFechaInicio = document.getElementById('fechaInicio').value;
//    var pHoraInicio = document.getElementById('horaInicio').value;
//    var pFechaFin = document.getElementById('fechaFin').value;
//    var pHoraFin = document.getElementById('horaFin').value;
//    var pLugar = document.getElementById('lugar').value;
//
//    var transaction = db.transaction(["medico"]);
//    var objectStore = transaction.objectStore("medico");
//    var getPermanent = objectStore.get(numcol);
//    getPermanent.onsuccess = function () {
//
//    };
//
//}


//La función startDB() inicializa la base de datos creandola y generando el squema, las tablas y los campos dentro de las tablas.

function startDB() {

    dataBase = indexedDB.open("rentg02", 1);
    var url = window.location.href;
    var location = url.split("/");
    var paginaActual = (location.slice(-1)[0]);
    if (paginaActual = "registrarse.html") {
        document.getElementById("articulosprincipales").innerHTML += '';
    } else {
    }

    dataBase.onupgradeneeded = function (e) {
        var active = dataBase.result;
        var objectStore = active.createObjectStore("coches", {keyPath: "matricula"});
        objectStore.createIndex('by_matricula', 'matricula', {unique: true});
        objectStore.createIndex('by_marca', 'marca', {unique: false});

        var objectStore = active.createObjectStore("clientes", {keyPath: "email"});
        objectStore.createIndex('by_nombre', 'nombre', {unique: false});
        objectStore.createIndex('by_dni', 'dni', {unique: false});
        objectStore.createIndex('by_contraseña', 'contraseña', {unique: false});
        objectStore.createIndex('by_movil', 'movil', {unique: false});

        var objectStore = active.createObjectStore("reservas", {keyPath: "id", autoIncrement: true});
        objectStore.createIndex('by_email', 'email', {unique: true});
        objectStore.createIndex('by_matricula', 'matricula', {unique: true});
        objectStore.createIndex('by_fechaInicio', 'fechaInicio', {unique: false});
        objectStore.createIndex('by_horaInicio', 'horaInicio', {unique: false});
        objectStore.createIndex('by_fechaFin', 'fechaFin', {unique: false});
        objectStore.createIndex('by_horaFin', 'horaFin', {unique: false});
        objectStore.createIndex('by_lugar', 'lugar', {unique: false});
    };

    dataBase.onsuccess = function (e) {
        alert('Database loaded');
        addResponsable();
        addCoches();
        //loadAll();
    };

    dataBase.onerror = function (e) {
        alert('Error loading database');
    };
}

function login() {

    var active = dataBase.result;
    var data = active.transaction(["clientes"], "readonly");
    var object = data.objectStore("clientes");
    var request = object.get(document.querySelector("#email").value);
    request.onsuccess = function (event) {
        alert(request);
        alert("request");
        alert(request.result.nombre);
        alert("asta aqui");
        alert("El nombre del usuario es: " + request.result.nombre);
        if (request.result.contraseña === document.querySelector("#contraseña").value)
        {
            alert(request.result.nombre);

            if (request.result.nombre === "Responsable")
            {
                location.href = "responsableO.html";
            } else
            {
                location.href = "inicioCliente.html";
            }
        } else
        {
            alert("Contraseña erronea");
        }
    };
}