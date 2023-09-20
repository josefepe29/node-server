const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const tareas = [];

function listarTareas() {
  return new Promise((resolve) => {
    setTimeout(() => {

      console.log('Lista de tareas:');
      tareas.forEach((tarea, index) => {
        console.log(`${index + 1}. [${tarea.estado ? 'Completada' : 'Pendiente'}] - ${tarea.descripcion}`);
      });
      resolve();
    }, 4000)
  });
}

function agregarTarea(descripcion) {
  return new Promise((resolve) => {
    setTimeout(() => {
      tareas.push({ descripcion, estado: false });
      console.log('Tarea agregada correctamente.');

      resolve();
    }, 4000)
  });
}

function eliminarTarea(indice) {
  return new Promise((resolve) => {
    setTimeout(() => {
      
      if (indice >= 0 && indice < tareas.length) {
        tareas.splice(indice, 1);
        console.log('Tarea eliminada correctamente.');
      } else {
        console.log('Índice de tarea no válido.');
      }
      resolve();
    },4000)
  });
}

function completarTarea(indice) {
  return new Promise((resolve) => {
    setTimeout(() => {
      
      if (indice >= 0 && indice < tareas.length) {
        tareas[indice].estado = true;
        console.log('Tarea marcada como completada.');
      } else {
        console.log('Índice de tarea no válido.');
      }
    },4000)
  })
}

function realizarPregunta() {
    
    rl.question('¿Qué acción deseas realizar? (listar/agregar/eliminar/completar/salir): ', async (accion) => {
      if (accion === 'listar') {
        await listarTareas();
        realizarPregunta()
      } else if (accion === 'agregar') {
        rl.question('Ingrese la descripción: ', async (descripcion) => {
          await agregarTarea(descripcion);
          await listarTareas();
          realizarPregunta()
        });
      } else if (accion === 'eliminar') {
        rl.question('Ingrese el número de la tarea que desea eliminar: ', async (indice) => {
          await eliminarTarea(parseInt(indice) - 1);
          await listarTareas();
          realizarPregunta()
        });
      } else if (accion === 'completar') {
        rl.question('Ingrese el número de la tarea que desea marcar como completada: ', async (indice) => {
          await completarTarea(parseInt(indice) - 1);
          await listarTareas();
          realizarPregunta()
        });
      } else if (accion === 'salir') {
        rl.close();
      } else {
        console.log('Acción no válida.');
      }

    });
  };


realizarPregunta()



