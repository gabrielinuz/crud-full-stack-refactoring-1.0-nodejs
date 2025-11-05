# crud-full-stack-refactoring-1.0-nodejs
Prototipo de CRUD Full Stack refactorizado versión 1.0
![Diagrama de secuencia de de la obtención de estudiantes](/uml/diagrama_de_secuencia_refactoring-1.0.png?raw=true "Diagrama de secuencia de de la obtención de estudiantes")

```En este refactoring se hizo agregado de paginador, solo se utiliza el módulo students para demostrar cómo implementar el backend con NodeJS.

## Configuración Inicial de Node.js
1-Descarga e instala Node.js: https://nodejs.org/es/download

2-Necesitas inicializar tu proyecto Node.js y guardar los módulos necesarios.

    Instrucciones (no es código):

    Navega a la carpeta backend/ en tu terminal.

    Inicializa el proyecto: npm init -y

    Instala Express, CORS 
    (necesario para que el frontend pueda "hablar" 
    con el backend en desarrollo) y el cliente MySQL: 
        npm install express cors mysql2

# Estructura de proyecto:
```/
├── backend/
│   ├── config/
│   │   └── databaseConfig.js     <-- (Aquí se usa $host, $user, etc.)
│   │   └── delete_db.sql <-- (Para borrar base de datos, usuario y privilegios.)
│   │   └── import_db.sql <-- (Para importar toda la base de datos inicial)
│   ├── controllers/
│   │   └── studentsController.js
│   │   └── studentsSubjectsController.js
│   │   └── subjectController.js  
│   ├── repositories/
│   │   └── studentsRepository.js
│   │   └── studentsSubjectsRepository.js
│   │   └── subjectRepository.js 
│   ├── routes/
│   │   └── routesFactory.js
│   │   └── studentsRoutes.js
│   │   └── studentsSubjectsRoutes.js
│   │   └── subjectRoutes.js 
│   └── server.js         <-- (El punto de entrada)
│
├── frontend/
│   ├── css/
│   │   └── style.css   
│   │   └── w3.css 
│   ├── html/
│   │   └── students.html  
│   │   └── studentsSubjects.html   
│   │   └── subjects.html  
│   ├── img/
│   │   └── favicon.png 
│   ├── js/
│   |   ├── apiConsumers/
│   │   |   └── apiFactory.js
│   │   |   └── studentsAPI.js
│   │   |   └── studentsSubjectsAPI.js
│   │   |   └── subjectsAPI.js
│   |   ├── frontControllers/
│   │   |   └── studentsFrontController.js
│   │   |   └── studentsSubjectsFrontController.js
│   │   |   └── subjectsFrontController.js
|   
└── index.html
