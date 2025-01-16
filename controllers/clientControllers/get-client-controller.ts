import { Request, Response } from "express";
import GetClient from "../../Dto/GetClientDto";
import ClientService from '../../services/ClientServices';

let get_client = async (req: Request, res: Response) => {  
    try {
        const { id_cliente } = req.params;
        const result = await ClientService.getClient(new GetClient (id_cliente))
        if(!result) {
            return res.status(404).json({message: 'Cliente no encontrado'})
        }else{
            return res.status(201).json(result);
        }
        
        } catch (error: any) {    
        if (error && error.code == "ER_DUP_ENTRY") {
            return res.status(500).json({ errorInfo: error.sqlMessage });
        } else {
            return res.status(500).json({ error: "Internal Server Error", details: error.message });
        }
        }
    };

    export default get_client;