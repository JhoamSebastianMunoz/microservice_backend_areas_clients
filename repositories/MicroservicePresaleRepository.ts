import { RowDataPacket } from 'mysql2';
import db from '../config/config-db';

class MicroservicePresaleRepository{
    // funcion para el microservicio preventa
    static async getDataClient(dataClient: string){
        const sql = `SELECT c.razon_social, c.nombre_completo_cliente, c.direccion, c.telefono, z.nombre_zona_trabajo FROM clientes c INNER JOIN zonas_de_trabajo z ON c.id_zona_de_trabajo = z.id_zona_de_trabajo WHERE id_cliente = ?;`;
        const values = [dataClient];
        const [rows] = await db.execute<RowDataPacket[]>(sql, values);

        return rows;
    }
}

export default MicroservicePresaleRepository;