
window.addEventListener("load", iniciar);
function iniciar(){
    var cs=document.getElementById("logoff").addEventListener("click", cerrarSesion);
    
}

function cerrarSesion(){
    sessionStorage.setItem("nomLogeado","");
    location.href = "index.html";
}