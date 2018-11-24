/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
window.addEventListener("load", iniciar, false);
function iniciar(){
    nombre=document.getElementById("nombre");
    dni=document.getElementById("dni");
    movil=document.getElementById("movil");
    correo=document.getElementById("correo");
    contrasena=document.getElementById("contraseña");
    
    nombre.addEventListener("change", controlar, false);
    dni.addEventListener("change", controlar, false);
    movil.addEventListener("change", controlar, false);
    email.addEventListener("change", controlar, false);
    contrasena.addEventListener("change", controlar, false);
    
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