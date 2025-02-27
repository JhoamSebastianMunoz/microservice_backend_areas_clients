import { Request, Response } from "express";
import assign_AreaUserService from "../../services/Assign_AreaUserService";
import GetArea from "../../Dto/GetAreaDto";

let assign_AreaUser = async(req:Request, res:Response) => {
    try {
        const { id_usuario } = req.params;
        const { zonas } = req.body; // Recibe un array de zonas

        if (!id_usuario || !zonas || !Array.isArray(zonas)) {
            return res.status(400).json({ error: "Debes proporcionar un id_usuario y una lista de id_zona." });
        }


        await assign_AreaUserService.assignAreaUser(Number(id_usuario), zonas as GetArea[]);
        
        return res.status(200).json({ message: "Zonas asignadas correctamente"});
    } catch (error: any) {
        console.error("Error asignando zonas:", error.message);
        return res.status(500).json({ error: "Error interno del servidor" });
    }
};

export default assign_AreaUser;