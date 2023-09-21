const readline = require('readline');
const http = require('http')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const tareas = [];

// Funcion para listar tareas

function listarTareas() {
  return new Promise((resolve) => {
    console.log('Lista de tareas:');
    setTimeout(() => {
      tareas.forEach((tarea, index) => {
        console.log(`${index + 1}. [${tarea.estado ? 'Completada' : 'Pendiente'}] - ${tarea.descripcion}`);
      });
      resolve('Lista de tareas: ');
    }, 4000)
  });
}

//Funcion para agregar tareas

function agregarTarea(id, descripcion) {
  
    return new Promise((resolve,reject) => {
      if (id === undefined || id === null || id.trim() === '' || id < 0 || id === 'number') {
        reject(new Error ('El ID de la tarea no es válido'));
        return;
      }
      
      // Verificar si el ID ya existe en las tareas existentes
      if (tareas.some((tarea) => tarea.id === id)) {
        reject(new Error('El ID de la tarea ya existe'));
        return;
      }
      setTimeout(() => {
        tareas.push({ id, descripcion, estado: false });
        resolve('Tarea agregada correctamente');
    }, 4000)
  });
}

//Funcion para eliminar tareas

function eliminarTarea(indice) {
  return new Promise((resolve, reject) => {
    if (indice === undefined || indice === null || indice.trim() === '' || indice < 0 || indice > tareas.length) {
      reject(new Error ('El ID de la tarea no es válido'));
      return;
    }

    setTimeout(() => {
      tareas.splice(indice, 1);
      resolve('Tarea eliminada correctamente');
    },4000)
  });
}

//Funcion para completar tareas

function completarTarea(indice) {
  return new Promise((resolve,reject) => {

    if (indice === undefined || indice === null || indice.trim() === '' || indice < 0 || indice > tareas.length) {
      reject(new Error ('El ID de la tarea no es válido'));
      return;
    }

    setTimeout(() => {

        tareas[indice].estado = true;
        console.log('Tarea marcada como completada.');
      
      resolve()
    },4000)
  })
}

//Funcion para salir

rl.on('close', () => {
  console.log('¡Hasta luego!');
});

//Principal

function realizarPregunta() {

  rl.question(`¿Qué acción deseas realizar? (
    listar
    agregar
    eliminar
    completar
    agregar
    salir
              
    accion: `,
    
    async (accion) => {

        if (accion === 'listar') {
          const listar = await listarTareas();
          console.log(listar)
          await realizarPregunta()
        } else if (accion === 'agregar') {
          (function ingreso() { 

            rl.question('Ingrese el id: ', async (id) => {
            rl.question('Ingrese la descripcion: ', async (descripcion) => { 
                try {
                  const agregar = await agregarTarea(id,descripcion);
                  console.log(agregar)
                } catch (err) {
                  console.log(err.message)
                  ingreso()
                }
                await listarTareas();
                realizarPregunta()
              })
            });
          } )()
        } else if (accion === 'eliminar') {
          rl.question('Ingrese el número de la tarea que desea eliminar: ', async (indice) => {
            try {
              const eliminar = await eliminarTarea(parseInt(indice) - 1);
              console.log(eliminar)
            } catch (err) {
              console.log(err.message)
            }
            await listarTareas();
            await realizarPregunta()
          });
        } else if (accion === 'completar') {
          rl.question('Ingrese el número de la tarea que desea marcar como completada: ', async (indice) => {
             try {
                const completar = await completarTarea(parseInt(indice) - 1);
                console.log(completar)
              } catch (err) {
                console.log(err.message)
              }
            await listarTareas();
            await realizarPregunta()
          });
        } else if (accion === 'salir') {
          rl.close()
        } else {
          console.log('Acción no válida.');
        }

      });
    
};

console.log(`Hola, Jose
  Vamos a cumplir tus metas
  `)
realizarPregunta()

// //--------------------------------------------------------------------------------------------------------------------------

//Servidor

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
  //console.log(`Servidor activo en http://${host}:${port}`)
})
