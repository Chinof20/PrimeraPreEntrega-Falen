const fs = require('fs');

const filePath = 'productos.json';

// Función para leer el archivo JSON
function leerArchivoJSON() {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(JSON.parse(data));
            }
        });
    });
}

// Función para escribir el archivo JSON
function escribirArchivoJSON(data) {
    return new Promise((resolve, reject) => {
        fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8', (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}

// Función para agregar un objeto con el siguiente 'id'
async function agregarObjetoConIdSiguiente(nuevoObjeto) {
  try {
    const objetosExistente = await leerArchivoJSON();
    const maxId = objetosExistente.reduce((max, obj) => (obj.id > max ? obj.id : max), 0);
    nuevoObjeto.id = maxId + 1;
    objetosExistente.push(nuevoObjeto);
    await escribirArchivoJSON(objetosExistente);
    console.log('Nuevo objeto agregado con id siguiente:', nuevoObjeto);
  } catch (error) {
    console.error('Error al agregar el objeto:', error);
  }
}

// Ejemplo de cómo usar la función para agregar un nuevo objeto con id siguiente
const nuevoObjeto = {
  // Propiedades de tu nuevo objeto aquí
    nombre: "prod2",
    precio: 19
};

agregarObjetoConIdSiguiente(nuevoObjeto);




const fs = require('fs').promises


async function agregarProducto(){
    // aca mando el array con productos
    try{
        const productos = await objetosEnArchivo()
        const ultimoId = productos.length > 0 ? productos[productos.length-1].id : 0
        const nuevoId = ultimoId + 1
        const productoParaAgregar = 
            {
                id: nuevoId,
                nombre: "product2",
                precio: 10
            } 
        productos.push(productoParaAgregar)
        console.log(productos)
        await guardarObjetos(productos)
        console.log("Contenido agregado")
    }
    catch(error){
        console.log("Error al escribir el archivo")
    }
}

async function guardarObjetos(objetos){
    try{
        const objetosParaGuardar = JSON.stringify(objetos, null, 2)
        await fs.promises.writeFile('productos.json', objetosParaGuardar)
    }catch(error){
        console.log("Error al guardar los productos", error)
    }
}



async function objetosEnArchivo(){
    try{
        const data = await fs.readFile('productos.json', 'utf-8')
        return (data ? JSON.parse(data) : [])
    }catch(error){
        return []
    }
}


const main = async() =>{
    await agregarProducto()
}

main().catch( (error)=>console.error(error) ) 
