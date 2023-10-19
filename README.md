# Lab4u_prototipo

Este repositorio contiene el codigo del prototipo final del programa lab4u, para poder inizializarlo deberemos:

- Tener instalado la version LTS de node js
- Clonar el repositorio en nuestra computadora
- Instalarlo
- Configurar la base de datos

## Instalación

Para instalar el proyecto debemos de correr el comando npm install

```bash
  npm install 
```

Deberemos tener instalado mysql e importar la base datos a través del dump, este sript se encuentra en la carpeta /mysql

## Variables de ambiente

Una vez que ya tengamos nuestra base de datos corriendo, deberemos de agregar las variables de ambiente para que el
proyecto pueda acceder a esta base encontradas en el archivo .env, las cuales son:

`MYSQL_USER`

`MYSQL_PASSWORD`

Y en el caso de que no estemos usando el puerto y host por default o el nombre de la base sea diferente a el que se usó
en el dump tambien cambiaremos las variables:

`MYSQL_PATH`

`MYSQL_DATABASE`

`MYSQL_PORT`

## Ejecucion

Finalmente para correr el proyecto, debemos de ejecutar alguno de los comandos dados por next:

Para el entorno de desarrollo tenemos:

```bash
  npm dev
```

Para produccion:

```bash
  npm build
  npm start
```
