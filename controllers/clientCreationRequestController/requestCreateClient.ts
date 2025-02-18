import { Request, Response } from "express";
import ClientService from '../../services/ClientServices';
import RequestCreateClientDto from "../../Dto/RequestCreateClientDto";
import requestCreateClientService from "../../services/RequestCreateClientService";

let requestCreateClient = async (req: Request, res: Response) => {  
  try {
    const {
      cedula,
      nombre_completo_cliente,
      direccion,
      telefono,
      rut_nit,
      razon_social,
      id_zona_de_trabajo
    } = req.body;
    
    await requestCreateClientService.request_createClient(new RequestCreateClientDto(cedula, nombre_completo_cliente, direccion, telefono, rut_nit, razon_social, id_zona_de_trabajo))
    
    return res.status(201).json(
      { status: 'Cliente registrado con éxito'}
    );
  } catch (error: any) {    
    if (error && error.code == "ER_DUP_ENTRY") {
        return res.status(500).json({ errorInfo: error.sqlMessage });
    } else {
        return res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
  }
};


export default requestCreateClient;