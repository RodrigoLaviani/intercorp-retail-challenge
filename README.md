# Intercorp Retail Challenge

## Instalación

Utilice las version 18 de node.
Recomiendo instalar [nvm](https://www.freecodecamp.org/news/node-version-manager-nvm-install-guide/) para poder usar el versionado de NodeJs del proyecto.

## Ejecución

```
nvm use (para usar el node del proyecto, si no lo tiene va a tener que usar nvm install 18.0.0)
npm install
npm run start
```
## Tests

Se corren ejecutando el comando en el proyecto:

```
npm run test
```

### Va a mostrar los tests con el coverage

## Overview

Se encuentra dividido en tres capas:

1. Controllers
2. Middlewares
3. Servicios

La responsabilidad del controller es dar una respuesta con un http status y un payload dependiendo que viene del servicio.
Los middlewares son los encargados de intervenir el request para ver si esta bien formado.
Los servicios tienen como tarea consumir los recursos externos, en este caso la api de PetStore.

## Postman
