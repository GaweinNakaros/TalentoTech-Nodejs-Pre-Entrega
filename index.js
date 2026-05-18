
// defino la url de la api a consultar.
const API_URL = 'https://fakestoreapi.com';


// definimos la constante method y resource, que se asignan a los valores correspondientes de process.argv.
const [, , method, resource] = process.argv; 
// El primer elemento es 'node', el segundo es el nombre del script, el tercero es el método HTTP, y el cuarto es el recurso. 
// El primer y segundo elemento los ignoramos ya que son la ruta y el nombre del script, y debemos saltarlos para obtener el método y el recurso correctamente.
// En este caso el método HTTP es 'GET' y el recurso es 'products'.


// Función para obtener la lista de productos
// Esta función hace una solicitud GET a la API para obtener todos los productos disponibles.
async function getProducts() {
  const respuesta = await fetch(`${API_URL}/products`); // Realizo una solicitud GET a la URL de la API para obtener la lista de productos.

  if (!respuesta.ok) {                   
    throw new Error(`Error al consultar productos: ${respuesta.status}`); // Si la respuesta no es exitosa muestro un mensaje que incluye el código de estado del error.
  }

  return respuesta.json();  // Si la respuesta es exitosa, convierto el cuerpo de la respuesta a formato JSON y lo retorno. De manera que el resultado sea un objeto JavaScript que representa la lista de productos.
}


// Función para obtener un producto por su ID
// Esta función hace una solicitud GET a la API para obtener los detalles de un producto específico utilizando su ID.
async function getProductId(productId) {
  const respuesta = await fetch(`${API_URL}/products/${productId}`); // recibo el parámetro productId, que es el ID del producto que se quiere obtener y envio unas solicitud get a la url de la api. 
  // awair sirve para esperar la respuesta de la solicitud antes de continuar con la ejecución del código.

  if (!respuesta.ok) {
    throw new Error(`Error al consultar el producto ${productId}: ${respuesta.status}`); //  si la respuesta es false, muestro en consola un mensaje de error que incluye el ID del producto y el código de estado de la respuesta usando la propiedad status.
  }

  const texto = await respuesta.text(); // primero convierto la respuesta de la api a texto en caso que sea exutosa pero me devuelva un texto vacio, ya si intento convertirlo directo a json me da el error Unexpected end of JSON input.

  if (!texto) {
    throw new Error(`No existe un producto con ID ${productId}`); // compruebo si el texto esta vacio, de esta forma puedo evitar el error Unexpected end of JSON input que ocurre cuando le pido a la api un producto que no existe con ese id, por ejemplo el 156. 
  }

  const producto = JSON.parse(texto); // comprobado que no es texto vacio lo convierto a formato JSON para obtener un objeto JavaScript que representa el producto solicitado.
    
  if (Object.keys(producto).length === 0) { // en este caso verifico que tenga propiedades, si no tiene propiedades entonces es un objeto vacio o es un producto que no exixste en la api.
    throw new Error(`No existe un producto con ID ${productId}`); // si es verdadero, muestro un mensaje de error indicando que no existe un producto con el ID proporcionado.
  }

  return producto;
}




// Función para mostrar los comandos disponibles en caso que ingrese algo mal o un comando un sin implementar.
function Comandos() {
  console.log('Comandos disponibles:');
  console.log('  npm run start GET products');
  console.log('  npm run start GET products/<productId>');
}


// Armado de una funcion principal para ordenar el codigo y manejar la logica de trabajo, tambien me permite manejar errores e implementar nuevos comandos facilmente a futuro.
async function main() {
  try {
    if (method !== 'GET' || !resource) {  // Verifico que el método sea 'GET' y que se haya proporcionado un recurso. 
      Comandos(); // Si no se cumple alguna de estas condiciones, muestro los comandos disponibles y salgo de la función.
      return;
    }

    if (resource === 'products') {  // Si el recurso es 'products', llamo a la función getProducts para obtener la lista de productos, luego imprimo los productos en la consola y salgo de la función.
      const products = await getProducts();
      console.log(products);
      return;
    }

    // Creo una constante donde nombre es el nombre del recurso (en este caso 'products') y productId es el ID del producto que quiero pedirle a la api.
    // Con el método split('/') divido el recurso con el carácter '/' como separador. Asi obtengo el nombre del recurso y el ID del producto.
    const [nombre, productId] = resource.split('/'); 

    if (nombre === 'products' && productId) { // verifico que el nommbre del recurso sea 'products' y que se haya proporcionado un ID de producto.
      const product = await getProductId(productId); // llamo a la función getProductId con el ID del producto para obtener los detalles del producto solicitado.
      console.log(product); // imprimo los detalles del producto en la consola.
      return;
    }

    // Si el recurso no coincide con ninguno de los casos anteriores, muestro un mensaje indicando que el comando no es reconocido y luego muestro los comandos disponibles.
    console.log('Comando no reconocido.');
    Comandos();
    // En caso de que ocurra algún error durante la ejecución de las funciones, el bloque catch captura el error y muestra su mensaje en la consola.
  } catch (error) {
    console.error(error);
    console.error(error.message);
  }
}

main();
