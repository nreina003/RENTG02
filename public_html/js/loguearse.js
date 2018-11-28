window.addEventListener("load", cargar, false);

function cargar() {
    iniciar();

}
function iniciar() {
    var email = document.getElementById("email").addEventListener("change", controlar, false);
    var contraseña = document.getElementById("contraseña").addEventListener("change", controlar, false);
    var l = document.getElementById("login1").addEventListener("click", login);

}
function controlar(e) {
    var elemento = e.target;
    if (elemento.validity.valid) {
        elemento.style.background = '#FFFFFF';
    } else {
        elemento.style.background = '#FFDDDD';
    }
}
function login() {

    var active = dataBase.result;
    var data = active.transaction(["clientes"], "readonly");
    var object = data.objectStore("clientes");
    var request = object.get(document.querySelector("#email").value);
    request.onsuccess = function (event) {
        if (request.result.contraseña === document.querySelector("#contraseña").value)
        {

            sessionStorage.setItem("nomLogeado", request.result.nombre);
            sessionStorage.setItem("emaLogeado", request.result.email);
            if (request.result.nombre === "Responsable")
            {
                alert("Hola " + request.result.nombre + ", ahora estas logeado.");
                location.href = "responsableO.html";
            }else
            {
                alert("Hola " + request.result.nombre + ", ahora estas logeado.");
                location.href = "inicioCliente.html";
            }
        } else
        {
            alert("Contraseña erronea");
        }
    };
}