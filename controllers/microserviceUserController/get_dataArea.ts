import { Request, Response } from "express";
import MicorserviceUserService from "../../services/MicorserviceUserService";

const get_areasByUser = async (req: Request, res: Response) => {
    try {
        const { id_area } = req.params;
        console.log('ID ZONA', id_area);
        
        const zona = await MicorserviceUserService.getDataArea(Number(id_area));


        if (!zona) {
            return res.status(404).json({ error: "Zona no encontrada" });
        }

        return res.status(200).json(zona);
    } catch (error: any) {
        console.error("Error obteniendo zona:", error.message);
        return res.status(500).json({ error: "Error interno del servidor" });
    }
};

export default get_areasByUser;
