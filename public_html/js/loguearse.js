window.addEventListener("load", iniciar, false);
function iniciar(){
    email=document.getElementById("email");
    contraseña=document.getElementById("contraseña");
    
    email.addEventListener("input", controlar, false);
    contraseña.addEventListener("change", controlar, false);
    
    //document.formaltapac.addEventListener("invalid", controlar, false);
    //document.formaltapac.addEventListener("input", controlar, false);
    //document.getElementById("btnSubmit").addEventListener("click",
    //enviar, false);   
    //validacion();
}

function controlar(e){
    var elemento=e.target;
    if(elemento.validity.valid){
        elemento.style.background='#FFFFFF';
    }else{
        elemento.style.background='#FFDDDD';
    }
}
function validacion(e){ 
    //var elemento=e.target;
    //elemento.style.background='#FFDDDD';
    
 }
 function enviar(){
     var valido=document.formaltapac.checkValidity();     
     if(valido){
         addCliente();
         document.formaltapac.submit();
         
     }
 }