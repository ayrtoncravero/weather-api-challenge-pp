# Challenge backend - Weather API - PP
En este documento se desglosan las tareas para su estimación, prioridad para su desarrollo, también se plantea la arquitectura, sus rutas, test y demás.

## Arquitectura de API:
Para separar las responsabilidades dentro de la misma se optó por hacer uso de una arquitectura de 3 capas:
Controllers: Se encargará de la lógica de respuestas HTTP.
Services: Se encarga de mantener la lógica de negocio.

### Por que usar esta arquitectura?
Se hace uso de la misma para mantener la separación de la logica http y de negoció, de esta manera el código se vuelva entendible y sobre todo escalable.

## Repositorio(código):
El proyecto va a ser alojado en Github, el mismo contará con un tablero kanban donde se verán reflejadas las tareas que fueron creadas y ordenadas por prioridad, el tablero nos ayudará a tener claridad y ser organizados con nuestro equipo de desarrollo, el mismo contará con 3 columnas:
- Todo: Las tareas pendientes de desarrollo.
- In progress: Las tareas que se están llevando a cabo.
- Done: Las tareas que fueron finalizadas.

### Ramas:
En este proyecto se planteó el uso de 3 ramas principales, para mantener claridad e integridad en las versiones del código:
- Máster: Consiste en la versión más estable y funcional del proyecto, equivalente a producción, esta rama no debe de ser tocada a menos que se le haga un merge en base a un PR.
- Developer: Consiste en una copia de Máster, de la cual siempre estar sincronizada con la rama madre, de esta vamos a partir para realizar las features.
- Nombre-de-tarea: Esta rama no representa a una sola rama, sino a cada tarea, por lo cual para el desarrollo de una tarea debemos de crear una nueva rama que contenga el nombre de la tarea(que haga referencia a ella) y debe de partir de la rama Develop.

## Tecnologías usadas:
### Internas:
- NodeJs
- Typescript
- Supertest
- ip-api
- Swagger
- husky
- eslint
- depcheck
- jest
### Api externa:
- Open weather map

## Tareas:
Las tareas básicas son las definidas a continuación, pero como todo desarrollo pueden llegar a surgir tareas que no fueron estimadas, las mismas seran plasmadas en sus respectivas tarjetas en Github.
- Creación de repositorio.
- Inicializar proyecto NodeJs.
- Subir el proyecto base a Github.
- Configurar librerías básicas y scripts:
    - ExpressJs
    - Typescript
- Crear estructura del proyecto
- Configurar y crear los .env.example y .env
- Instalar y configurar:
    - Linter
    - Husky
    - Pre-commit
    - Depcheck
    - Morgan
    - Helmet
    - body-parser
- Crear rutas necesarias
- Crear controller necesarios
- Crear services necesarios
- Configurar y documentar con Swagger
- Configurar y agregar tests