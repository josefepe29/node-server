const readline = require('readline');
const http = require('http')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const tareas = [];

//Funcion para listar tareas

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

//Funcion para agregar tareas

function agregarTarea(descripcion,id) {
  return new Promise((resolve) => {
    setTimeout(() => {
      tareas.push({ id, descripcion, estado: false });
      console.log('Tarea agregada correctamente.');

      resolve();
    }, 4000)
  });
}

//Funcion para eliminar tareas

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

//Funcion para completar tareas

function completarTarea(indice) {
  return new Promise((resolve) => {
    setTimeout(() => {
      
      if (indice >= 0 && indice < tareas.length) {
        tareas[indice].estado = true;
        console.log('Tarea marcada como completada.');
      } else {
        console.log('Índice de tarea no válido.');
      }
      resolve()
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
          rl.question('Ingrese el id: ', async (id) => {  
            await agregarTarea(descripcion,id);
            await listarTareas();
            realizarPregunta()
          })
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

//--------------------------------------------------------------------------------------------------------------------------

//Constantes servidor

const host = 'localhost'

const port = 8080

const requestListener = (req, res) => {
  res.writeHead(200)
  res.write(JSON.stringify(tareas))
  res.end()
}

const server = http.createServer(requestListener)

server.listen(port, host, () => {
  console.log(`Servidor activo en http://${host}:${port}`)
})
