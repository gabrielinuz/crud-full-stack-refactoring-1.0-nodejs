/**
* File        : backend/server.js
* Project     : CRUD Node.js
* Date        : Noviembre 2025
* Status      : Implemented
*/

//Instancia de express para manejo de toda la API REST
const app = express();
const PORT = 3000; // Puedes usar otro puerto si lo necesitas

// Necesario para __dirname en módulos ES6
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import express from 'express';
import cors from 'cors';

// SERVIR ARCHIVOS ESTÁTICOS DEL FRONTEND:
import path from 'path';
import { fileURLToPath } from 'url';

//importar distintos manejos de rutas por módulo:
import studentsRouter from './routes/studentsRoutes.js';
// Importa los routers de las otras rutas (subjects, studentsSubjects) cuando los crees
// import subjectsRouter from './routes/subjectsRoutes.js'; 
// import studentsSubjectsRouter from './routes/studentsSubjectsRoutes.js'; 

// ===================================
// MIDDLEWARES
// ===================================

// 1. CORS: Permite la conexión desde el frontend (http://localhost:80/...)
// Si el frontend y backend están en diferentes puertos.
app.use(cors()); 

// 2. Body Parser: Express usa JSON en el body de las peticiones (POST/PUT/DELETE)
app.use(express.json());

// 3. Servir archivos estáticos desde ../frontend
app.use(express.static(path.join(__dirname, '..', 'frontend')));

// 4. Redirigir la ruta raíz (/) al index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'frontend', 'html', 'index.html'));
});

// ===================================
// RUTAS PRINCIPALES
// ===================================

// El prefijo de tu API era /backend/server.php?module=students
// Lo mapeamos a /api/students para una API REST más semántica
app.use('/api/students', studentsRouter);
// app.use('/api/subjects', subjectsRouter);
// app.use('/api/studentsSubjects', studentsSubjectsRouter);


// ===================================
// INICIO DEL SERVIDOR
// ===================================
app.listen(PORT, () => {
    console.log(`Servidor Node.js corriendo en http://localhost:${PORT}`);
    // console.log(`El endpoint de estudiantes es http://localhost:${PORT}/api/students`);
});