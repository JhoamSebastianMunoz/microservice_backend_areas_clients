import { Request, Response } from "express";
import AreasService from '../../services/AreaServices';

let get_Areas = async (req: Request, res: Response) => {  
    try {
        const result = await AreasService.getAreas()
        return res.status(200).json(result);
        } catch (error: any) {    
            if (error && error.code == "ER_DUP_ENTRY") {
                return res.status(500).json({ errorInfo: error.sqlMessage });
            } else {
                return res.status(500).json({ error: "Internal Server Error", details: error.message });
            }
        }
    };

    export default get_Areas;