const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const tareas = [];

function listarTareas() {
  console.log('Lista de tareas:');
  tareas.forEach((tarea, index) => {
    console.log(`${index + 1}. [${tarea.estado ? 'Completada' : 'Pendiente'}] - ${tarea.descripcion}`);
  });
}

function agregarTarea(descripcion) {
  tareas.push({ descripcion, estado: false });
  console.log('Tarea agregada correctamente.');
}

function eliminarTarea(indice) {
  if (indice >= 0 && indice < tareas.length) {
    tareas.splice(indice, 1);
    console.log('Tarea eliminada correctamente.');
  } else {
    console.log('Índice de tarea no válido.');
  }
}

function completarTarea(indice) {
  if (indice >= 0 && indice < tareas.length) {
    tareas[indice].estado = true;
    console.log('Tarea marcada como completada.');
  } else {
    console.log('Índice de tarea no válido.');
  }
}
function realizarPregunta() {
  
  rl.question('¿Qué acción deseas realizar? (listar/agregar/eliminar/completar/salir): ', (accion) => {
    
    if (accion === 'listar') {
      listarTareas();
      realizarPregunta()
    } else if (accion === 'agregar') {
      rl.question('Ingrese la descripción de la tarea: ', (descripcion) => {
        agregarTarea(descripcion);
        listarTareas();
        realizarPregunta()
      });
    } else if (accion === 'eliminar') {
      rl.question('Ingrese el número de la tarea que desea eliminar: ', (indice) => {
        eliminarTarea(parseInt(indice) - 1);
        listarTareas();
        realizarPregunta()
      });
    } else if (accion === 'completar') {
      rl.question('Ingrese el número de la tarea que desea marcar como completada: ', (indice) => {
        completarTarea(parseInt(indice) - 1);
        listarTareas();
        realizarPregunta()
      });
    } else if (accion === 'salir') {
      rl.close()
    } else {
      console.log('Acción no válida.');
      realizarPregunta()
    }
  });
}

realizarPregunta()
