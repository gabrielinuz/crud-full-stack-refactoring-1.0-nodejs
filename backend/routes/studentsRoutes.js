/**
* File        : backend/routes/studentsRoutes.js
* Project     : CRUD Node.js
* Author      : Gemini (Adaptación)
* Date        : Noviembre 2025
* Status      : Implemented (Routes Only)
*/
import express from 'express';
// Importamos las funciones del controlador
import { 
    getStudents, 
    createStudentHandler, 
    updateStudentHandler, 
    deleteStudentHandler 
} from '../controllers/studentsController.js';

const router = express.Router();

// GET /api/students
// La ruta llama al controlador, que contiene toda la lógica.
router.get('/', getStudents);

// POST /api/students
router.post('/', createStudentHandler);

// PUT /api/students
router.put('/', updateStudentHandler);

// DELETE /api/students
router.delete('/', deleteStudentHandler);


export default router;