import { Request, Response } from "express";
import DeleteArea from "../../Dto/DeleteAreaDto";
import AreaService from '../../services/AreaServices';

let delete_area = async (req: Request, res: Response) => {  
    try {
        const { id_zona_de_trabajo } = req.params;
        const result = await AreaService.deleteArea(new DeleteArea(id_zona_de_trabajo));
        if (!result) {
            return res.status(404).json({ error: "Zona de trabajo no encontrado." });
        }
        else {
            return res.status(200).json({ message: "Zona de trabajo eliminado con éxito" });
        }
    } catch (error: any) {
        if (error.code === "ER_ROW_IS_REFERENCED") {
            return res.status(409).json({ error: "No se puede eliminar la Zona de trabajo debido a referencias existentes en otros registros." });
        }
        return res.status(500).json({ error: "Error interno del servidor", details: error.message });
    }
};

    export default delete_area;