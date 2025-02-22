import { Request, Response } from "express";
import axios from 'axios';
import dotenv from 'dotenv'
dotenv.config();

let get_product = async (req: Request, res: Response) => {  
    const { id_producto } = req.params;
    try {
        const productUrl = process.env.AZURE_PRODUCTS_URL;
        console.log('URL de solicitud:', `${productUrl}/get-product/${id_producto}`);
    
        try {
          const respuesta = await axios.get(`${productUrl}/get-product/${id_producto}`, {
            timeout: 10000, // Aumentar tiempo de espera a 10 segundos
            headers: {
              'Accept': 'application/json'
            }
          });
    
          res.json({
            mensaje: 'Producto encontrado',
            producto: respuesta.data,
          });
        } catch (axiosError) {
          console.error('Detalles del error de Axios:', axiosError);
    
          if (axios.isAxiosError(axiosError)) {
            if (axiosError.response) {
              // El servidor respondió con un código de estado fuera del rango 2xx
              console.error('Respuesta de error:', axiosError.response.data);
              console.error('Código de estado:', axiosError.response.status);
              
              res.status(axiosError.response.status).json({ 
                mensaje: 'Error en el servidor remoto',
                detalle: axiosError.response.data 
              });
            } else if (axiosError.request) {
              // La solicitud se hizo pero no se recibió respuesta
              console.error('Sin respuesta del servidor:', axiosError.request);
              res.status(503).json({ 
                mensaje: 'No se pudo conectar con el servicio',
                detalle: 'Sin respuesta del servidor' 
              });
            } else {
              // Algo sucedió al configurar la solicitud
              console.error('Error de configuración:', axiosError.message);
              res.status(500).json({ 
                mensaje: 'Error de configuración',
                detalle: axiosError.message 
              });
            }
          } else {
            // Error no relacionado con Axios
            console.error('Error desconocido:', axiosError);
            res.status(500).json({ 
              mensaje: 'Error desconocido',
              detalle: 'Ocurrió un error inesperado' 
            });
          }
        }
      } catch (error) {
        console.error('Error general:', error);
        res.status(500).json({ 
          mensaje: 'Error al comunicarse con el servicio',
          detalle: error instanceof Error ? error.message : 'Error desconocido'
        });
      }
    };
    
    export default get_product;