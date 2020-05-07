# md-links

## INFORMACIÓN GENERAL

[Markdown](https://es.wikipedia.org/wiki/Markdown) es un lenguaje de marcado
ligero muy popular entre developers. Es usado en muchísimas plataformas que
manejan texto plano (GitHub, foros, blogs, ...), y es muy común
encontrar varios archivos en ese formato en cualquier tipo de repositorio
(empezando por el tradicional `README.md`).

Markdown links es una herramienta que usa [Node.js](https://nodejs.org/), que lea y analice archivos
en formato `Markdown`, para verificar los links que contengan y reportar
algunas estadísticas.

## INSTALACIÓN

- Para instalar esta librería debemos ejecutar el siguiente comando en nuestra terminal

   **npm install yud-cumba/md-links**

   y ya tendrás instalada la API.

![npm-install](https://raw.githubusercontent.com/yud-cumba/md-links/master/img/instalación.png)

## JAVASCRIPT API

El módulo puede importarse en otros scripts de Node.js con la siguiente interfaz:

#### `mdLinks(path, options)`

##### Argumentos

- `path`: Ruta absoluta o relativa al archivo o directorio.
- `options`: Un objeto con las siguientes propiedades:
  * `validate`: Booleano que determina si se desea validar los links encontrados.

##### Valor de retorno

La función retorna una promesa (`Promise`) que resuelva a un arreglo (`Array`) de objetos (`Object`), donde cada objeto representa un link y contiene
las siguientes propiedades:

- `href`: URL encontrada.
- `text`: Texto que aparecía dentro del link.
- `file`: Ruta del archivo donde se encontró el link.

#### Ejemplo

```js
const mdLinks = require("md-links");

mdLinks("./test/paraProbar")
  .then(links => {
    // => [{ href, text, file }]
  })
  .catch(console.error);

mdLinks("./test/paraProbar", { validate: true })
  .then(links => {
    // => [{ href, text, file, status, ok }]
  })
  .catch(console.error);

mdLinks("./test/paraProbar.README.md")
  .then(links => {
    // => [{ href, text, file }]
  })
  .catch(console.error);
```
El error al colocar una ruta no existente imprime el mensaje `[ruta] is not a valid path, please try again`.

## CLI

### MODO DE USO

- **md-links** 
Al colocar **md-links** en la terminal te muestra el mensaje de bienvenida y las opciones que puedes escoger 

![md-links](https://raw.githubusercontent.com/yud-cumba/md-links/master/img/md-links.png)


El ejecutable de nuestra aplicación debe poder ejecutarse de la siguiente
manera a través de la terminal:

`md-links <path-to-file> [options]`

El comportamiento por defecto identifica el archivo markdown (a partir de la ruta que recibe como argumento), analiza el archivo Markdown e imprime los links que vaya encontrando, junto con la ruta del archivo donde aparece y el texto
que hay dentro del link.
Por ejemplo:

![md-links-path](https://raw.githubusercontent.com/yud-cumba/md-links/master/img/md-links-path.png)

### OPCIONES

##### `--validate`

Si pasamos la opción `--validate`, el módulo hace una petición HTTP para averiguar si el link funciona o no. Si el link resulta en una redirección a una URL que responde ok, entonces consideraremos el link como ok y lo coloca en una tabla.

![md-links-validate] (https://raw.githubusercontent.com/yud-cumba/md-links/master/img/md-links-validate.png)

Vemos que el _output_ en este caso incluye la palabra `ok` o `fail` como status text además del status de la respuesta recibida a la petición HTTP a dicha URL. Si por algún motivo alguna URL es un enlace inválido, coloca un `Not Found` en su estado.


##### `--stats`

Si pasamos la opción `--stats` el output (salida) será un texto con estadísticas
básicas sobre los links.

Por ejemplo:

![md-links-stats](https://raw.githubusercontent.com/yud-cumba/md-links/master/img/md-links-stats.png)

##### `--stats --validate` o `--stats --validate`

También podemos combinar `--stats` y `--validate` para obtener estadísticas que
necesiten de los resultados de la validación.

Por ejemplo:

![md-links-stats-validate](https://raw.githubusercontent.com/yud-cumba/md-links/master/img/md-links-stats-validate.png)

[Información del backlog para la implementación de la librería](https://github.com/yud-cumba/md-links/blob/master/BACKLOG.md)