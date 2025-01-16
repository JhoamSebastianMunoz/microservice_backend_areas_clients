import { Request, Response } from "express";
import DeleteClient from "../../Dto/DeleteClientDto";
import ClientService from '../../services/ClientServices';

let delete_client = async (req: Request, res: Response) => {  
    try {
        const { id_cliente } = req.params;
        const result = await ClientService.deleteClient(new DeleteClient(id_cliente));
        if (!result) {
            return res.status(404).json({ error: "Cliente no encontrado." });
        }
        else {
            return res.status(200).json({ message: "Cliente eliminado con éxito" });
        }
    } catch (error: any) {
        if (error.code === "ER_ROW_IS_REFERENCED") {
            return res.status(409).json({ error: "No se puede eliminar el cliente debido a referencias existentes en otros registros." });
        }
        return res.status(500).json({ error: "Error interno del servidor", details: error.message });
    }
};

    export default delete_client;