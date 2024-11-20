# CoderHouseBackend3

Repo para el curso Backend 3 de Coderhouse

## Pre-Entrega

Para la pre entrega, se tiene el servicio **Mocking Service** encargado de generar data de usuarios y mascotas

Las propiedades de ambos estan definidas en sus respectivos *schemas*

Los usuarios tienen las siguientes propiedades:

1. firstName
2. lastName
3. email
4. password
5. role
6. pets

Las mascotas tienen las siguientes propiedades:

1. name
2. specie
3. breed
4. adopted
5. birthDate
6. picture

Para probar la generacion de dichos *mocks*:

1. Correr la app localmente mediante ```npm run dev```
2. Para los usuarios, usar el *endpoint* [api/mocks/mockingusers](http://localhost:8080/api/mocks/mockingusers)
3. Para las mascotas, usar el *endpoint* [api/mocks/mockingpets](http://localhost:8080/api/mocks/mockingpets)

Cada *endpoint* devolverá 50 usuarios y 50 mascotas respectivamente.

Por último, se puede escribir en la base de datos **AdoptMe**, de la siguiente forma:

1. Correr la app localmente mediante ```npm run dev```
2. Mediante herramientas como **Postman**, realizar un *Post* al *endpoint* [api/mocks/generateData](http://localhost:8080/api/mocks/generateData),
con el *body* bajo el siguiente formato (recordar tener, entre los parametros de *Headers*, el valor *Content-Type* = 'application/json'):
```json
{
  "users": 20,
  "pets": 20
}
```
3. En caso de exito, se verá la siguiente respuesta, y se podrá validar utilizando los *endpoints* de consulta de [usuarios](http://localhost:8080/api/users) y [mascotas](http://localhost:8080/api/pets)
```json
{
    "status": "Success",
    "message": "Data generated successfully"
}
```
4. En caso de error, el mensaje será `Couldn't generate data :/`, resultando en no haber podido escribir en la base de datos

## Entrega Final

### Adoption endpoints

Se realizaron tests funcionales para todos los *endpoints* del router adoption.router.js

Dichos *endpoints* son:


<details>
 <summary><code>GET</code> <code><b>/</b></code> <code>gets all adoptions done</code></summary>

##### Parameters

> | name      |  type     | data type               | description                                                           |
> |-----------|-----------|-------------------------|-----------------------------------------------------------------------|
> | None      |  required | object (JSON)   | returns an array of all adoptions object  |


##### Responses

> | http code     | content-type                      | status                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `text/plain;charset=UTF-8`        | `success`                                |

</details>

<details>
 <summary><code>GET</code> <code><b>/:aid</b></code> <code>gets the adoption that matches the adoption id</code></summary>

##### Parameters

> | name      |  type     | data type               | description                                                           |
> |-----------|-----------|-------------------------|-----------------------------------------------------------------------|
> | None      |  required | object (JSON)   | returns an object with the ownerId and petId  |


##### Responses

> | http code     | content-type                      | status                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `text/plain;charset=UTF-8`        | `success`                                |
> | `404`         | `text/plain;charset=UTF-8`        | `error`                                |
</details>

<details>
 <summary><code>POST</code> <code><b>/:uid/pid</b></code> <code>creates a new adoption for a certain user and pet</code></summary>

##### Parameters

> | name      |  type     | data type               | description                                                           |
> |-----------|-----------|-------------------------|-----------------------------------------------------------------------|
> | None      |  required | object (JSON)   | creates a new adoption based on a userId and petId. If user or pet does not exits, returns an error  |


##### Responses

> | http code     | content-type                      | status                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `text/plain;charset=UTF-8`        | `success`                                |
> | `404`         | `text/plain;charset=UTF-8`        | `error`                                |
</details>

<details>
 <summary><code>DELETE</code> <code><b>/:aid</b></code> <code>deletes an adoption</code></summary>

##### Parameters

> | name      |  type     | data type               | description                                                           |
> |-----------|-----------|-------------------------|-----------------------------------------------------------------------|
> | None      |  required | object (JSON)   | deletes de specified adoption based on the adoptionId. If adoption does not exist, returns an error  |


##### Responses

> | http code     | content-type                      | status                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `text/plain;charset=UTF-8`        | `success`                                |
> | `404`         | `text/plain;charset=UTF-8`        | `error`                                |
</details>


### Adoption endpoints testing

**IMPORTANTE** - Para testear estos 4 *endpoints* se debe:

1. Correr la app localmente mediante ```npm run dev:testing```.
2. En otra consola, correr el comando ```npm run test```.

Los tests funcionales, mediante la configuracion de 1. estara entonces accediendo a una DB
de testing, que es limpiada cada vez que se finalizan los tests, sin afectar la DB original.
Dichos tests evaluan un esenario donde, se crea un usuario y una mascota, y en base a sus Ids, se crea la nueva adopcion, luego se obtienen las adopciones (que seran una ya que la DB de test se limpia al finalizar) y con esa adopcion obtenida se usa su id para consultar por ella de manera especifica. Finalmente, se elimina la adopcion de la DB de prueba. Por otro lado, los escenarios de casos fallidos son tambien testeados en el transcurso de todo el flujo.


### Docker

Se ha creado un Dockerfile, presente en la ruta principal, que permite generar una imagen del projecto. Entre sus pasos, elige la image de node18 de Docker hub, configura las carpetas internas, instala las dependencias del projecto, configura el puerto a usar, y ejecuta el comando para que la aplicación corra.

### Docker Image

En base al Dockerfile, se creó una imagen, la cual se subió a Docker Hub, y está disponible en el siguiente enlace:

[Docker image del projecto final](https://hub.docker.com/r/ezequielzarza/coderbackend3)


