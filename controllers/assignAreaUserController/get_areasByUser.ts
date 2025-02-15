import { Request, Response } from "express";
import Asignarzonas_usuarioService from "../../services/Assign_AreaUserService";
import axios from "axios";

const get_areasByUser = async (req: Request, res: Response) => {
    try {
        const userRole = req.body.role;
        const userId = req.body.id_usuario;
        const { id_usuario } = req.params;

        if (!id_usuario) {
            return res.status(400).json({ error: "Debes proporcionar un id_usuario." });
        }

        const responseUser = await axios.get(`http://localhost:10101/api/usuarios/id_usuario/${id_usuario}`)
            console.log('RESPUESUSUARIO.DATAA:', responseUser.data);
            console.log('NOMBREEE:', responseUser.data.nombreCompleto);
            console.log('NOMBREEE:', responseUser.data.rol);

            const result =
            userRole === "COLABORADOR"
                ? await Asignarzonas_usuarioService.getAreaByUserColaborador(Number(id_usuario), userId)
                : await Asignarzonas_usuarioService.getAreaByUser(Number(id_usuario));
        // const zonas = await Asignarzonas_usuarioService.getAreaByUser(Number(id_usuario));
            if (!result || result.length === 0) {
                return res.status(404).json({error: `Zona no encontrada o no asignada para el usuario ${responseUser.data.nombreCompleto}`});
            }
            return res.status(200).json({
                nobreUsuario: responseUser.data.nombreCompleto,
                zonas: result});
    } catch (error: any) {
        console.error("Error obteniendo zonas del usuario:", error.message);
        return res.status(500).json({ error: "Error interno del servidor" });
    }
};

export default get_areasByUser;
