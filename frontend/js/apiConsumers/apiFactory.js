/**
* File        : frontend/js/api/apiFactory.js
* Project     : CRUD PHP / Node.js
* Author      : Tecnologías Informáticas B - Facultad de Ingeniería - UNMdP
* Date        : Noviembre 2025
* Status      : Migrated to Node.js URL
*/

// EL NUEVO PUERTO Y PREFIJO DEL BACKEND DE NODE.JS
// Asegurarse de que el PORT y el prefijo coincidan con el de server.js (ej: 3000 y /api/)
const NODE_API_PREFIX = 'http://localhost:3000/api/'; 

export function createAPI(moduleName, config = {}) 
{
    // CAMBIO CLAVE: Usamos la URL semántica de Express
    const API_URL = config.urlOverride ?? `${NODE_API_PREFIX}${moduleName}`;

    // ... (El resto del código de sendJSON y fetch sigue siendo válido) ...

    async function sendJSON(method, data) 
    {
        const res = await fetch(API_URL,
        {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        //Si la respuesta no es correcta lanzar excepción con error en el método
        if (!res.ok) throw new Error(`Error en ${method}`);
        // Si no hay body (ej. DELETE 204 No Content), devolvemos un objeto vacío
        if (res.status === 204) {  return {}; }

        return await res.json();
    }

    return {
        async fetchAll()
        {
            const res = await fetch(API_URL);
            if (!res.ok) throw new Error("No se pudieron obtener los datos");
            return await res.json();
        },
        async fetchPaginated(page = 1, limit = 10)
        {
            // CAMBIO CLAVE: Los parámetros se envían como query params en la URL RESTful
            // Antes: ../../backend/server.php?module=students&page=1&limit=5
            // Ahora: http://localhost:3000/api/students?page=1&limit=5
            const url = `${API_URL}?page=${page}&limit=${limit}`;
            const res = await fetch(url);
            if (!res.ok)
                throw new Error("Error al obtener datos paginados");
            return await res.json();
        },
        async create(data)
        {
            return await sendJSON('POST', data);
        },
        async update(data)
        {
            return await sendJSON('PUT', data);
        },
        async remove(id)
        {
            // DELETE en RESTful: Envía el ID en el body (como lo hacía tu frontend)
            return await sendJSON('DELETE', { id });
        }
    };
}