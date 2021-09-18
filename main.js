//Variable
const form = document.querySelector('.form-tarea');
const tareas = document.getElementById('lista');
const contenedor = document.querySelector('.contenedor-tarea');
let listaTarea = [];

//eventos
eventos();
function eventos() {
  form.addEventListener('submit', agregarTarea);
  
//Cargar las tareas del local storage
  document.addEventListener('DOMContentLoaded', () => {
    listaTarea = JSON.parse(localStorage.getItem('tareas')) || [];
    crearHTML();
  })
}


//Funciones
function agregarTarea(e) {
  e.preventDefault()
  
  const tarea = tareas.value;
  const infoTarea = {
    tarea,
    id: Date.now()
  };
  
  listaTarea = [...listaTarea, infoTarea];
  
  validarTarea(tarea)
  
  crearHTML();
  
}

function crearHTML() {
  limpiarHTML();
  
  listaTarea.forEach(tarea => {
    const li = document.createElement('li');
    const botonBorrar = document.createElement('a');
    
    li.innerText = tarea.tarea;
    botonBorrar.innerText = 'X';

    li.classList.add('li');
    botonBorrar.classList.add('borrar');
    
    contenedor.appendChild(li);
    li.appendChild(botonBorrar);
    
    borrarTarea(tarea.id, botonBorrar, contenedor)
    
  });
  agregarTareaLocalStorage()
}

function limpiarHTML() {
  while (contenedor.firstChild) {
    contenedor.removeChild(contenedor.firstChild)
  }
}

function agregarTareaLocalStorage() {
  localStorage.setItem('tareas', JSON.stringify(listaTarea));
}

function borrarTarea(id, botonBorrar, contenedor) {
  botonBorrar.addEventListener('click', () => {
    listaTarea = listaTarea.filter(tarea => tarea.id !== id)
    crearHTML();
  })
}
