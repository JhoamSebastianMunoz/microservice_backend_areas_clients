import { Request, Response } from "express";
import MicroservicePresaleService from "../../services/MicroservicePresaleService";

// endpoint para consultar datos del cliente para el microservicio preventa 
let get_dataClien = async(req:Request, res:Response) =>{
    try {
        const{ id_client } = req.params;
        
        const data = await MicroservicePresaleService.getDataClient(id_client);

        return res.status(200).json({
            razon_social: data.razon_social,
            nombre_completo_cliente: data.nombre_completo_cliente,
            direccion: data.direccion,
            telefono: data.telefono,
            zona: data.nombre_zona_trabajo
        })
        
    } catch (error:any) {
        if (error.message.includes("no encontrado")) {
            return res.status(404).json({ error: error.message });
        }

        return res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
}

export default get_dataClien;