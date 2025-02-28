import { Request, Response } from "express";
import MicorserviceUserService from "../../services/MicorserviceUserService";

const get_clientArea = async (req: Request, res: Response) => {
    try {
        const { id_area } = req.params;
        console.log('ID ZONA', id_area);
        
        const clientes = await MicorserviceUserService.getClientArea(Number(id_area));

        if (!clientes || clientes.length === 0) {
            return res.status(404).json({ error: "No hay clientes en esta zona" });
        }

        return res.status(200).json(clientes);
    } catch (error: any) {
        console.error("Error obteniendo zona:", error.message);
        return res.status(500).json({ error: "Error interno del servidor" });
    }
};

export default get_clientArea;
