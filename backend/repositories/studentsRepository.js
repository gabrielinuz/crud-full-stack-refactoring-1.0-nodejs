/**
* File        : backend/repositories/studentsRepository.js
* Project     : CRUD Node.js
* Date        : Noviembre 2025
* Status      : Implemented
*/
import db from '../config/databaseConfig.js';

export async function getPaginatedStudents(limit, offset) 
{
    const [rows] = await db.query(
        "SELECT * FROM students LIMIT ? OFFSET ?", 
        [limit, offset]
    );
    return rows;
}

export async function getTotalStudents() 
{
    const [rows] = await db.query("SELECT COUNT(*) AS total FROM students");
    // El CRUD en PHP original retornaba el valor 'total'
    return rows[0].total; 
}

export async function createStudent(fullname, email, age)
{
    const [result] = await db.query(
        "INSERT INTO students (fullname, email, age) VALUES (?, ?, ?)", 
        [fullname, email, age]
    );
    return { 
        inserted: result.affectedRows, 
        id: result.insertId 
    };
}

export async function updateStudent(id, fullname, email, age) 
{
    const [result] = await db.query(
        "UPDATE students SET fullname = ?, email = ?, age = ? WHERE id = ?", 
        [fullname, email, age, id]
    );
    return { updated: result.affectedRows };
}

export async function deleteStudent(id) 
{
    // Nota: Aquí podría ir la lógica de validación de FK (como en studentsController.php)
    
    const [result] = await db.query(
        "DELETE FROM students WHERE id = ?", 
        [id]
    );
    return { deleted: result.affectedRows };
}

// Puedes añadir getStudentById, getAllStudents si son necesarios.
export async function getStudentById(id)
{
    const [rows] = await db.query(
        "SELECT * FROM students WHERE id = ?", 
        [id]
    );
    return rows[0]; 
}