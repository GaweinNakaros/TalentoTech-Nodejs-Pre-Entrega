
// defino la url de la api a consultar.
const API_URL = 'https://fakestoreapi.com';


// definimos la constante method y resource, que se asignan a los valores correspondientes de process.argv.
const [, , method, resource, ...args] = process.argv;
const [title, price, category] = args; 
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


// Funcin para crear un producto nuevo
// Esta funcion hace una solicitud POST a la API para agregar un producto con los datos que recibo por consola.
async function crearProduct(title, price, category) {
  const nuevoProducto = {
    title: title,
    price: Number(price), // convierto el precio a un número para asegurarme de que se envíe en el formato correcto a la api.
    category: category
  };

  const respuesta = await fetch(`${API_URL}/products`, { // envio una solicitud POST a la URL de la API para crear un nuevo producto. El segundo argumento es un objeto de configuración que especifica el método HTTP, los encabezados y el cuerpo de la solicitud.
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(nuevoProducto)
  }); // El body contiene el objeto nuevoProducto convertido a texto JSON porque la API recibe los datos en ese formato.

// Ejemplo de Fake Store API para crear un producto nuevo usando fetch:
//   const product = { title: 'New Product', price: 29.99 };
//   fetch('https://fakestoreapi.com/products', {
//      method: 'POST',
//      headers: { 'Content-Type': 'application/json' },
//      body: JSON.stringify(product)
// })
//   .then(response => response.json())
//   .then(data => console.log(data));

  if (!respuesta.ok) {
    throw new Error(`Error al crear el producto: ${respuesta.status}`);
  }

  return respuesta.json(); // Convierto la respuesta de la API a JSON y retorno el producto creado.
}


// Función para eliminar un producto por su ID
// Esta función crea una solicitud DELETE a la API para borrar el producto especificado.
async function eliminarProduct(productId) {
  const respuesta = await fetch(`${API_URL}/products/${productId}`, { //
    method: 'DELETE'
  });

// Ejemplo de Fake Store API para eliminar un producto por su ID usando fetch:
//   fetch('https://fakestoreapi.com/products/1', {
//   method: 'DELETE'
// })
//   .then(response => response.json())
//   .then(data => console.log(data));

  if (!respuesta.ok) {
    throw new Error(`Error al eliminar el producto ${productId}: ${respuesta.status}`);// Si la respuesta no es exitosa, muestro un mensaje de error que incluye el ID del producto y el código de estado de la respuesta.
  }

  return respuesta.json(); // Convierto la respuesta de la API a JSON y retorno el resultado.
}




// Función para mostrar los comandos disponibles en caso que ingrese algo mal o un comando sin implementar.
function comandos() {
  console.log('Comandos disponibles:');
  console.log('  npm run start GET products');
  console.log('  npm run start GET products/<productId>');
  console.log('  npm run start POST products <title> <price> <category>');
  console.log('  npm run start DELETE products/<productId>');
}


// Armado de una funcion principal para ordenar el codigo y manejar la logica de trabajo, tambien me permite manejar errores e implementar nuevos comandos facilmente a futuro.
async function main() {
  try {
    if (!resource) {  // caso que no se pase un recurso por consolo. 
      comandos(); // Muestro los comandos disponibles y salgo de la función.
      return;
    }

    if (method === 'GET' && resource === 'products') {  // verifico que sea una solicitud get y que el recurso es 'products', llamo a la función getProducts para obtener la lista de productos, luego imprimo los productos en la consola y salgo de la función.
      const products = await getProducts();
      console.log(products);
      return;
    }
    // llegaodo a esta instancia entiendo que el recurso no es "products" o el metodo no es "GET", entonces verifico si el recurso tiene el formato "products/<productId>" para obtener un producto por su ID.
    // Creo una constante donde nombre es el nombre del recurso (en este caso 'products') y productId es el ID del producto que quiero pedirle a la api.
    // Con el método split('/') divido el recurso con el carácter '/' como separador. Asi obtengo el nombre del recurso y el ID del producto.
    const [nombre, productId] = resource.split('/'); 

    if (method === 'GET' && nombre === 'products' && productId) { // verifico el metodo, que el nommbre del recurso sea 'products' y que se haya proporcionado un ID de producto.
      const product = await getProductId(productId); // llamo a la función getProductId con el ID del producto para obtener los detalles del producto solicitado.
      console.log(product); // imprimo los detalles del producto en la consola.
      return;
    }

    // en esta instancia entiendo que el metodo no es "GET", entonces verifico si el metodo es "DELETE" y el recurso tiene el formato "products/<productId>" para eliminar un producto por su ID.
    if (method === 'DELETE' && nombre === 'products' && productId) { // verifico si el metodo es DELETE y que el recurso sea products/<productId>.
      const productoEliminado = await eliminarProduct(productId); // llamo a la función eliminarProduct para borrar el producto en la API.
      console.log(productoEliminado); // imprimo en consola el resultado de la eliminación.
      return;
    }

    // en esta instancia entiendo que el metodo no es "GET" ni "DELETE", entonces verifico si el metodo es "POST" y el recurso tiene el formato "products" para crear un producto nuevo.
    if (method === 'POST' && resource === 'products' && title && price && category) { // Verifico que el método sea POST, el recurso sea products y que se hayan pasado title, price y category.
      const productoCreado = await crearProduct(title, price, category); // llamo a la función crearProduct para enviar los datos del producto nuevo a la API.
      console.log(productoCreado); // imprimo en consola el resultado que devuelve la API.
      return;
    }

    // Si el recurso no coincide con ninguno de los casos anteriores, muestro un mensaje indicando que el comando no es reconocido y luego muestro los comandos disponibles.
    console.log('Comando no reconocido.');
    comandos();
    // En caso de que ocurra algún error durante la ejecución de las funciones, el bloque catch captura el error y muestra su mensaje en la consola.
  } catch (error) {
    //console.error(error);
    console.error(error.message);
  }
}

main();
