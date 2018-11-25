window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;

//prefixes of window.IDB objects
window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange

if (!window.indexedDB) {
    window.alert("Your browser doesn't support a stable version of IndexedDB.")
}
 var dataBase;

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
    var active = dataBase.result;
    var data = active.transaction(["clientes"], "readwrite");
    var object = data.objectStore("clientes");
    var request = object.put({
        nombre : document.querySelector("#nombre").value,
        email : document.querySelector("#email").value,
        contraseña  : document.querySelector("#contraseña").value,
        dni  : document.querySelector("#dni").value,
        movil  : document.querySelector("#movil").value}
    );
    request.onsuccess = function (e) {
        alert("Info añadida a la BD correctamente");
    };

    request.onerror = function (e) {
        alert(request.error.name + '\n\n' + request.error.message);
    };

}

function getCliente() {	
	var email = document.getElementById("miemail").value;	
	
	var active = dataBase.result;
	var data = active.transaction(["clientes"], "readonly");
	var object = data.objectStore("clientes");
	var elements = [];
	
	object.openCursor().onsuccess = function (e) {
	
		var result = e.target.result;
		if (result === null) {
			return;
		}
		elements.push(result.value);
		result.continue();

	};
	data.oncomplete = function () {
		for (var key in elements) {
			alert(elements[key].dni);
		}
		elements = [];
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


function startDB() {
                
    dataBase = indexedDB.open("rentg02", 1);
	var url = window.location.href;
	var location = url.split("/");
	var paginaActual = (location.slice(-1)[0] );
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
        objectStore.createIndex('by_name', 'name', {unique: false});
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

}

    dataBase.onsuccess = function (e) {
        alert('Database loaded');
        //loadAll();
    };

    dataBase.onerror = function (e) {
        alert('Error loading database');
    };
}