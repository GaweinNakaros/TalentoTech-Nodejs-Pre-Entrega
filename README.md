# Pre-entrega - CLI Fake Store API

Este repositorio esta pensado para que cada alumno desarrolle su propia solucion en `index.js` a partir de los requerimientos compartidos en clase.

El archivo `index.js` no forma parte de la entrega base: la idea es que ustedes lo escriban y usen la suite de tests como autoevaluacion para comprobar si su implementacion cumple con lo pedido.

## Que incluye este repositorio

- `package.json` con la configuracion del proyecto.
- Las dependencias necesarias para ejecutar los tests.
- La suite de tests para autoevaluar la solucion.

## Que no incluye este repositorio

- El archivo `index.js`, porque debe ser desarrollado por cada alumno.
- Los requerimientos del ejercicio, porque seran compartidos en clase.

## Requisitos

- Tener instalado Node.js 18 o superior.
- Tener instalado Git Bash.
- Tener conexion a internet para consumir la Fake Store API.
- Contar con los requerimientos del ejercicio compartidos en clase.

## Preparacion del proyecto

1. Descargar o clonar este repositorio.
2. Abrir la carpeta del proyecto desde Git Bash.
3. Instalar las dependencias:

```bash
npm install
```

4. Crear y desarrollar el archivo `index.js` siguiendo los requerimientos entregados en clase.

## Estructura esperada

- `index.js` debe estar ubicado en la raiz del proyecto.
- La ejecucion del programa debe realizarse con `npm run start`.
- La autoevaluacion debe ejecutarse con `npm test`.

## Objetivo

La aplicacion debe ejecutarse desde la terminal con el script:

```bash
npm run start
```

Segun la consigna, el programa debe interpretar comandos para consultar, crear, actualizar y eliminar productos usando Fake Store API.

La salida debe imprimirse con `console.log(data)` sin darle formato adicional a los datos.

## Ejemplos de uso esperados

### Obtener todos los productos

```bash
npm run start GET products
```

Salida esperada (fragmento):

```
[
  {
    id: 1,
    title: 'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops',
    price: 109.95,
    description: 'Your perfect pack for everyday use...',
    category: "men's clothing",
    image: 'https://fakestoreapi.com/img/...',
    rating: { rate: 3.9, count: 120 }
  },
  ... (20 productos en total)
]
```

### Obtener un producto por ID

```bash
npm run start GET products/7
```

Salida esperada:

```
{
  id: 7,
  title: 'White Gold Plated Princess',
  price: 9.99,
  description: 'Classic Created Wedding Engagement Solitaire Diamond Promise Ring...',
  category: 'jewelery',
  image: 'https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_QL65_ML3_t.png',
  rating: { rate: 3, count: 400 }
}
```

### Crear un producto

```bash
npm run start POST products "Remera negra" 29.99 "men's clothing"
```

Salida esperada:

```
{
  id: 21,
  title: 'Remera negra',
  price: '29.99',
  category: "men's clothing"
}
```

### Eliminar un producto

```bash
npm run start DELETE products/7
```

Salida esperada:

```
{
  id: 7,
  title: 'White Gold Plated Princess',
  price: 9.99,
  description: 'Classic Created Wedding Engagement Solitaire Diamond Promise Ring...',
  category: 'jewelery',
  image: 'https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_QL65_ML3_t.png',
  rating: { rate: 3, count: 400 }
}
```

## Autoevaluacion con tests

Los tests estan incluidos para que puedan validar su solucion una vez implementado `index.js`.

1. Asegurarse de estar trabajando desde Git Bash.
2. Verificar que `index.js` exista en la raiz del proyecto.
3. Ejecutar la suite:

```bash
npm test
```

Si los tests pasan, su implementacion cumple con los casos cubiertos por esta autoevaluacion.

La autoevaluacion sirve como guia para validar el comportamiento principal del CLI, pero no reemplaza la revision de los requerimientos compartidos en clase.

## Nota

- Se recomienda no ejecutar estos comandos desde PowerShell, ya que en algunos entornos puede haber restricciones con `npm`. Para esta pre-entrega, la referencia esperada es Git Bash.
