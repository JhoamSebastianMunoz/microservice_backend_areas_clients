import { Request, Response } from "express";
import requestCreateClientService from "../../services/RequestCreateClientService";

let get_pendingRequestClients = async (req: Request, res: Response) => {  
    try {
        const result = await requestCreateClientService.getPendingRequests()
        if(result.length === 0){
            return res.status(404).json({ error: "No hay solicitudes pendientes" })
        }
        return res.status(200).json(result);
        } catch (error: any) {    
            if (error && error.code == "ER_DUP_ENTRY") {
                return res.status(500).json({ error: error.sqlMessage });
            } else {
                return res.status(500).json({ error: "Internal Server Error", details: error.message });
            }
        }
    };

    export default get_pendingRequestClients;