/**
* File        : backend/databaseConfig.js
* Project     : CRUD Node.js
* Date        : Noviembre 2025
* Status      : Implemented
*/
import mysql from 'mysql2/promise';

// Reemplaza estos valores con los de tu databaseConfig.php
const pool = mysql.createPool({
    host: 'localhost',      // El host que usabas en PHP ($host)
    user: 'student',           // El usuario que usabas en PHP ($user)
    password: '12345',   // La clave que usabas en PHP ($password)
    database: 'students',    // La base de datos que usabas en PHP ($db_name)
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

export default pool;

// NOTA: Para usar 'import/export' en Node.js, se debe agregar
// "type": "module" a tu archivo package.json.