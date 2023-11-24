# BlogFlow

## Primeros pasos
 en el archivo `./config/config.json` cambiar a tus user password para la base de datos e instalamos las dependencias
 ```sh
  $ npm install
 ```
 
## Tests

para crear las base de datos y las tablas en test hacemos
```sh
 $ NODE_ENV=test npm run db-create
 $ NODE_ENV=test npm run db-migrate
```
una vez creada la bd y las tablas corremos las pruebas
```sh
 $ npm test
```

## Start project
creamos las tablas en dev
```sh
 $ npm run db-create
 $ npm run db-migrate
```
cargamos las seeds
```sh
 $ npm run db-seed
```
inicializamos el proyecto
```sh
 $ npm run start
```