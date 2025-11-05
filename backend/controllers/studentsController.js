/**
* File        : backend/controllers/studentsController.js
* Project     : CRUD Node.js
* Date        : Noviembre 2025
* Status      : Implemented
*/

// Importamos todas las funciones del Repositorio (la capa de acceso a datos)
import { 
    getStudentById,
    getPaginatedStudents, 
    getTotalStudents, 
    createStudent, 
    updateStudent, 
    deleteStudent 
} from '../repositories/studentsRepository.js';


/**
 * Maneja las peticiones GET para obtener estudiantes (por ID o paginados).
 * @param {object} req - Objeto de la petición de Express.
 * @param {object} res - Objeto de la respuesta de Express.
 */
export async function getStudents(req, res)
{
    try {
        const { id, page, limit } = req.query;

        if (id) {
            // Lógica para GET por ID
            const student = await getStudentById(id);
            if (student) {
                return res.json(student);
            }
            return res.status(404).json({ error: "Estudiante no encontrado" });
        }
        
        if (page && limit) {
            // Lógica para GET paginado
            const pageNum = parseInt(page);
            const limitNum = parseInt(limit);
            const offset = (pageNum - 1) * limitNum;

            const students = await getPaginatedStudents(limitNum, offset);
            const total = await getTotalStudents();

            return res.json({
                students: students,
                total: total
            });
        }
        
        // Si no hay parámetros requeridos.
        return res.status(400).json({ error: "Parámetros de consulta (page, limit) requeridos." });

    } catch (err) {
        console.error("Error en Controller.getStudents:", err);
        res.status(500).json({ error: "Error interno del servidor" });
    }
}

/**
 * Maneja la creación de un nuevo estudiante (POST).
 * @param {object} req - Objeto de la petición de Express.
 * @param {object} res - Objeto de la respuesta de Express.
 */
export async function createStudentHandler(req, res)
{
    try {
        const { fullname, email, age } = req.body; 

        if (!fullname || !email || !age) {
            return res.status(400).json({ error: "Datos incompletos" });
        }

        const result = await createStudent(fullname, email, age);

        if (result.inserted > 0) {
            return res.status(201).json({ message: "Estudiante agregado correctamente" });
        }
        return res.status(500).json({ error: "No se pudo agregar" });

    } catch (err) {
        console.error("Error en Controller.createStudent:", err.message);
        res.status(500).json({ error: "Error interno del servidor" });
    }
}

/**
 * Maneja la actualización de un estudiante existente (PUT).
 * @param {object} req - Objeto de la petición de Express.
 * @param {object} res - Objeto de la respuesta de Express.
 */
export async function updateStudentHandler(req, res)
{
    try {
        const { id, fullname, email, age } = req.body;
        
        if (!id || !fullname || !email || !age) {
            return res.status(400).json({ error: "Datos incompletos para la actualización" });
        }

        const result = await updateStudent(id, fullname, email, age);

        if (result.updated > 0) {
            return res.json({ message: "Actualizado correctamente" });
        }
        return res.status(404).json({ error: "No se pudo actualizar o el estudiante no existe" }); 

    } catch (err) {
        console.error("Error en Controller.updateStudent:", err.message);
    }
}

/**
 * Maneja la eliminación de un estudiante (DELETE).
 * @param {object} req - Objeto de la petición de Express.
 * @param {object} res - Objeto de la respuesta de Express.
 */
export async function deleteStudentHandler(req, res)
{
    try {
        const { id } = req.body; 
        
        if (!id) {
            return res.status(400).json({ error: "ID de estudiante requerido para la eliminación" });
        }
        
        const result = await deleteStudent(id);

        if (result.deleted > 0) {
            return res.json({ message: "Eliminado correctamente" });
        }
        return res.status(404).json({ error: "No se pudo eliminar o el estudiante no existe" });
        
    } catch (err) {
        console.error("Error en Controller.updateStudent:", err.message);
        res.status(500).json({ error: "Error interno del servidor" });
    }
}