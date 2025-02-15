import axios from "axios";
import assign_AreaUserRepository from "../repositories/AssingAreaUserRepository";

class assign_AreaUserService{
    static async assignAreaUser(id_usuario: number, zonas: number[]) {
        // Validar si el usuario existe en el microservicio de Usuarios
        try {
            let responserUser = await axios.get(`http://localhost:10101/api/usuarios/id_usuario/${id_usuario}`);
            if (!responserUser.data) {
                throw new Error(`Usuario con ID ${id_usuario} no encontrado.`);
            }
        
            if (responserUser.data.rol === 'ADMINISTRADOR') {
                throw new Error(`Usuario con ID ${id_usuario} no es colaborador.`);
            }
        } catch (error:any) {
            if (error.response && error.response.status === 404) {
                throw new Error(`Usuario con ID ${id_usuario} no encontrado.`);
            }
            console.error("Error en la consulta de usuario:", error.message);
            throw new Error("Error consultando el microservicio de usuarios.");
        }
    
        // Validar si todas las zonas existen
        for (const id_zona of zonas) {
            const zonaExiste = await assign_AreaUserRepository.getAreaById(id_zona);
            if (!zonaExiste) throw new Error(`Zona con ID ${id_zona} no encontrada.`);
        }
    
        // Asignar las zonas al usuario
        return await assign_AreaUserRepository.postAreaUser(id_usuario, zonas);
    }

    // Obtener las areas asiganasdas como colaborador getAreaByUserColaborador
    static async getAreaByUserColaborador(id_usuario: number, userId:number) {
        return await assign_AreaUserRepository.getAreaByUserColaborador(id_usuario, userId);
    }

    // Obtener las areas asiganasdas a un usuario como administrador
    static async getAreaByUser(id_usuario: number) {
        return await assign_AreaUserRepository.getAreaByUser(id_usuario);
    }

    static async getClientsByUser(id_usuario: number, id_zona: number) {
        return await assign_AreaUserRepository.getClientsBtUser(id_usuario, id_zona);
    }
};

export default assign_AreaUserService;