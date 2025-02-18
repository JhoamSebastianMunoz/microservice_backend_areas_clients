import {Request, Response} from 'express';
import Request_createClienteRepository from '../../repositories/RequestCreateClientRepository';

let acceptOrRejectController = async(req:Request, res:Response)=>{
    try {
        const { id_client } = req.params;

        const result = await Request_createClienteRepository.updateRequest(Number(id_client));
            if(!result){
                return res.status(404).json({ error: "Cliente no encontrado o ya activado." });
            }
            else{ return res.status(200).json(
                {status:'Cliente activado con éxito'}
            ); 
            }
        }catch(error:any){
            if(error && error.code == "ER_DUP_ENTRY"){
                return res.status(500).json({errorInfo: error.sqlMessage})
            }else{
                return res.status(500).json({error: "Internal Server Error", details: error.message })
            }
        }
};

export default acceptOrRejectController;