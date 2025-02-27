import axios from "axios";
import assign_AreaUserRepository from "../repositories/AssingAreaUserRepository";
import dotenv from "dotenv";
import GetArea from "../Dto/GetAreaDto";
import AreaRepository from "../repositories/AreaRepository";
dotenv.config();

class assign_AreaUserService{
    static async assignAreaUser(id_usuario: number, zonas: GetArea[]) {
        // Validar si el usuario existe en el microservicio de Usuarios
        console.log('ENTRO A ASSIGNAREAUSER');
        
        try {
            let responserUser = await axios.get(`https://tatsoftgestionusuarios-hufsaqe0emc6gsf4.eastus-01.azurewebsites.net/api/usuarios/id_usuario/${id_usuario}`);
            console.log('USERRESPONSE: ', responserUser.data);
            
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
            console.log('ENTRO AL FOR');
            const zonaExiste = await AreaRepository.get(id_zona);
            console.log('CONSULTO ZONAS EXISTENTES:', zonaExiste);
            
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