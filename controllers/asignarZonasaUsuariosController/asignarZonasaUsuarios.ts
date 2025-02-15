import { Request, Response } from "express";

let asignarZonasAUsuarios = async(req:Request, res:Response) => {
    try {
        const { id_usuario, zonas } = req.body; // Recibe un array de zonas

        if (!id_usuario || !zonas || !Array.isArray(zonas)) {
            return res.status(400).json({ error: "Debes proporcionar un id_usuario y una lista de id_zona." });
        }

        const resultado = await ZonaService.asignarZonasAUsuario(Number(id_usuario), zonas);
        return res.status(200).json({ message: "Zonas asignadas correctamente", resultado });
    } catch (error: any) {
        console.error("Error asignando zonas:", error.message);
        return res.status(500).json({ error: "Error interno del servidor" });
    }
};

export default asignarZonasAUsuarios;