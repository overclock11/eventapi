## Descripción

El proyecto consiste en un API para gestión de eventos de diferentes tipos como conciertos por ejemplo, a través de los servicios podemos hacer un CRUD de los eventos, crear usuarios, hacer login con un usuario y cargar archivos xlsx para agregar nuevos eventos a la base de datos.
El proyecto está hecho usando Nodejs, typescript y express principalmente y se encuentra dividio en capas según la responsabilidad de cada una.


### Ambiente necesario para levantar localmente el proyecto

Debe tener instalado localmente los siguientes requisitos
* Node: 21.7.1
* mysql: 8.0.x

#### Pasos para levantar localmente el proyecto.
1. Clonar el proyecto y en la carpeta raiz hacer npm install
2. Crear el esquema de bases de datos en su mysql usando el script [eventSchema.sql](/sources/eventSchema.sql)
3. Opcionalmente pero de manera recomendada puede cargar algunos datos iniciales usando el script [initialData.sql](/sources/eventSchema.sql)
4. En el archivo .env configure la conexión a su base de datos y el token de mapbox
5. Con la base de datos configurada y los prerequisitos instalados puede levantar el proyecto haciendo ``npm run dev``, por defecto sube en el puerto 3000 pero puede variar según su configuración del archivo .env
6. Usando un cliente HTTP puede empezar a consumir los servicios

Una vez el proyecto esté corriendo puede ver el swagger en http://localhost:3000/docs/#/


#### A continuación puede ver los diagramas relacionados al proyecto

**Entidad relación**
![Entidad relación](/sources/entidad-relacion.png)

**Arquitectura on-premise cloud**
![arquitectura hibrida](/sources/arquitetura%20cloud%20-%20onpremise.png)
