import { Request, Response } from "express";
import assign_AreaUserService from '../../services/Assign_AreaUserService';
import dotenv from "dotenv";
dotenv.config();
import axios from "axios";

const get_ClientsByUser = async (req: Request, res: Response) => {
    try {
        const { id_usuario, id_zona } = req.params;

        if (!id_usuario) {
            return res.status(400).json({ error: "Debes proporcionar un id_usuario." });
        }

        const clientes = await assign_AreaUserService.getClientsByUser(Number(id_usuario), Number(id_zona));
        console.log('CLIENTESSS:', clientes);
        
        const responsUser = await axios.get(`${process.env.AZURE_USER_URL}/api/usuarios/id_usuario/${id_usuario}`)

        return res.status(200).json({
            nombreUsuario: responsUser.data,
            clientes
        });
    } catch (error: any) {
        console.error("Error obteniendo clientes del usuario:", error.message);
        return res.status(500).json({ error: "Error interno del servidor" });
    }
};

export default get_ClientsByUser;
