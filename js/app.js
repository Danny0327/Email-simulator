
const btnEnviar = document.querySelector('#enviar');
const btnReset = document.querySelector('#resetBtn');
const formulario = document.querySelector('#enviar-mail');
//variables para campos
const email = document.querySelector('#email');
const asunto = document.querySelector('#asunto');
const mensaje = document.querySelector('#mensaje');

//Expresiones regulares
//https://emailregex.com/
const er = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

eventListeners();
function eventListeners(){
    //la app arranca
    document.addEventListener('DOMContentLoaded', iniciarApp);
    //campos del formulario
    email.addEventListener('blur', validarFormulario);
    asunto.addEventListener('blur', validarFormulario);
    mensaje.addEventListener('blur', validarFormulario);

    //reinicia el formulario
    btnReset.addEventListener('click', resetearFormulario);

    //enviar formulario
    formulario.addEventListener('submit', enviarEmail)
} 
//funciones
function iniciarApp() {
    btnEnviar.disabled = true;
    btnEnviar.classList.add('cursor-not-allowed', 'opacity-50');
}
//valida el formulario
function validarFormulario(e) {

    if(e.target.value.length > 0) {
        //elimina errores...
        const error = document.querySelector('p.error');
        if(error){
            error.remove();
        }
       

        e.target.classList.remove('border','border-red-500');
        e.target.classList.add('border','border-green-500');
        // console.log('si hay algo')
    } else{
        e.target.classList.remove('border','border-red-500');
        e.target.classList.add('border','border-red-500');  
        mostrarError('Todos los campos son obligatorios');

    }

    if(e.target.type === 'email') {
        //expresión regular
        
        // const resultado = e.target.value.indexOf('@');
        // console.log(resultado)
        //if(resultado < 0 ) 
        // mostrarError('El email no es valido');
        if(er.test(e.target.value)) {
            //console.log('Email valido');  
            const error = document.querySelector('p.error');
            if(error){
                error.remove();
            }
           
            
            e.target.classList.remove('border','border-red-500');
            e.target.classList.add('border','border-green-500');
        }else{
            // console.log('email no valido');
            e.target.classList.remove('border','border-green-500');
            e.target.classList.add('border','border-red-500');
       
            mostrarError('Email no valido')
        }
    }

    if(er.test(email.value) && asunto.value !== '' &&mensaje.value !== ''){
        btnEnviar.disabled = false;
        btnEnviar.classList.remove('cursor-not-allowed', 'opacity-50');
        //console.log('pasaste la validación');
    } 
}

function mostrarError(mensaje) {
    const mensajeError = document.createElement('p');
    mensajeError.textContent = mensaje;
    mensajeError.classList.add('border','border-red-500','background-red-100','text-red-500','p-3','mt-5','text-center','error');

    const errores = document.querySelectorAll('.error');
        if(errores.length === 0) {
            // formulario.insertBefore(mensajeError, document.querySelector('.mb-10'));          mensaje arriba
            formulario.appendChild(mensajeError);
        }
    
}
//envia el email

function enviarEmail(e){
    e.preventDefault();
    //console.log('enviando...');
    //mostrar el spinner
    const spinner = document.querySelector('#spinner');
    spinner.style.display = 'flex';
    //despues de 3 segundos oculta el spinner y muestra el mensaje
    setTimeout(()=>{
        spinner.style.display = 'none';

        //mensaje que dice que se envio correctamente
        const parrafo = document.createElement('p');
        parrafo.textContent = 'El mensaje se envió correctamente';
        parrafo.classList.add('text-center', 'my-10', 'p-2', 'bg-green-500', 'text-white', 'font-bold', 'uppercase')
        //inserta el parrafo antes del spinner
        formulario.insertBefore(parrafo, spinner);

        setTimeout(()=>{
            parrafo.remove();
            resetearFormulario();
            // function resetearFormulario(): void
        },5000)
    },3000);
    
        //     console.log('esta función se ejecuta después de 3 segundos')
        // } ,3000 );
    //despues de 3 segundos ocultar el spinner y mostrar el mensaje
    // setTimeout(()=>{
    //     console.log('esta función se ejecuta después de 3 segundos')
    // } ,3000 );
    // setInterval(()=>{
    //     console.log('esta función se ejecuta cada 3 segundos')
    // } ,3000 );
}
//function resetearFormulario
//función que resetea el formulario

function resetearFormulario(){
    formulario.reset();
   

    // iniciarApp();
}