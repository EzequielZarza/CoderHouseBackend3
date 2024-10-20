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

