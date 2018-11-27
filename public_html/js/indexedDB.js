window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;

//prefixes of window.IDB objects
window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;

// Se comprueba que tu navegador soporte la version de indexedDB.

if (!window.indexedDB) {
    window.alert("Your browser doesn't support a stable version of IndexedDB.");
}
window.addEventListener("load", startDB);
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
        // alert('Object successfully added');
    };
}

//Función addCoches creara cuatro coches predefinidos en la BD de IndexedDB.
function addCoches() {
    var active = dataBase.result;
    var data = active.transaction(["coches"], "readwrite");
    var object = data.objectStore("coches");
    var request = object.put({
        matricula: "2341 QWE",
        marca: "Fiat 500"
    });
    var request = object.put({
        matricula: "3412 ASD",
        marca: "Opel Corsa"
    });
    var request = object.put({
        matricula: "4123 ZXC",
        marca: "Peugeot 3008"
    });
    var request = object.put({
        matricula: "4321 DFG",
        marca: "Renault Twingo 3D"
    });
    request.onerror = function (e) {
        alert(request.error.matricula + '\n\n' + request.error.message);
    };
    data.oncomplete = function (e) {
        //alert('Object successfully added');
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
        //alert("Info añadida a la BD correctamente");
    };
    request.onerror = function (e) {
        alert(request.error.nombre + '\n\n' + request.error.message);
    };

}

function addReserva() {

    var active = dataBase.result;
    alert("addreserva");
    var data = active.transaction(["reservas"], "readwrite");
    alert("addreserva");
    var object = data.objectStore("reservas");
    alert("addreserva");
    var request = object.put({
        email: document.querySelector("#email").value,
        matricula: document.querySelector("#modelo").value,
        fechaInicio: document.querySelector("#fechaInicio").value,
        horaInicio: document.querySelector("#horaInicio").value,
        fechaFin: document.querySelector("#fechaFin").value,
        horaFin: document.querySelector("#horaFin").value,
        lugar: document.querySelector("#lugar").value
    });
    request.onsuccess = function (e) {
        //alert("Info añadida a la BD correctamente");
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




//La función startDB() inicializa la base de datos creandola y generando el squema, las tablas y los campos dentro de las tablas.

function startDB() {

    dataBase = indexedDB.open("rentg02", 1);
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
        objectStore.createIndex('by_lugarrec', 'lugar', {unique: false});

    };

    dataBase.onsuccess = function (e) {
        //alert('Database loaded');
        addResponsable();
        addCoches();
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



        alert("El nombre del usuario es: " + request.result.nombre);
        if (request.result.contraseña === document.querySelector("#contraseña").value)
        {

            sessionStorage.setItem("nomLogeado", request.result.nombre);

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


function saludo() {
    var saludar = document.getElementById("saludo");
    saludar.innerHTML += "HOLA " + sessionStorage.getItem("nomLogeado");
};

//
//function mostrarReserva() {
//
//    var active = dataBase.result;
//    var data = active.transaction(["reservas"], "readonly");
//    var object = data.objectStore("reservas");
//    var request = object.get(document.querySelector("#id").value);
//    request.onsuccess = function (event) {
//
//        if (request.result.email === document.querySelector("#email").value) {
//
//            object.openCursor().onsuccess = function (e) {
//
//
//            };
//        }
//        alert("El nombre del usuario es: " + request.result.nombre);
//
//    };
//}