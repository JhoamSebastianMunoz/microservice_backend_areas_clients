import {Request, Response} from 'express';
import UpdateClient from '../../Dto/UpdateClientDto';
import ClientService from '../../services/ClientServices';

let update_client = async(req:Request, res:Response)=>{
    try {
        const{ id_cliente } =req.params;
        const {
            cedula,
            nombre_completo_cliente,
            direccion,
            telefono,
            rut_nit,
            razon_social,
            estado,
            id_zona_de_trabajo
            } = req.body;
        
        const result = await ClientService.updateClient(new UpdateClient(id_cliente, cedula, nombre_completo_cliente, direccion, telefono, rut_nit, razon_social, estado, id_zona_de_trabajo));
            if(!result || result.affectedRows === 0){
                return res.status(404).json({ error: "Cliente no encontrado." });
            }
            return res.status(200).json(
                {status:'ok, Cliente actualizado con éxito'}
            ); 
            
        }catch(error:any){
            if(error && error.code == "ER_DUP_ENTRY"){
                return res.status(500).json({errorInfo: error.sqlMessage})
            }else{
                return res.status(500).json({error: "Internal Server Error", details: error.message })
            }
        }
};

export default update_client;