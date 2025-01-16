import { Request, Response } from "express";
import axios from 'axios';

let get_product = async (req: Request, res: Response) => {  
    const { id_producto } = req.params;
    try {
        const respuesta = await axios.get(`http://localhost:10102/get-product/${id_producto}`);
        res.json({
        mensaje: 'Producto encontrado',
        producto: respuesta.data,
        });
    } catch (error: any) {
        if (error.response && error.response.status === 404) {
        res.status(404).json({ mensaje: 'Producto no encontrado en ServidorB' });
        } else {
        res.status(500).json({ mensaje: 'Error al comunicarse con ServidorB' });
        }
    }
};

export default get_product;
