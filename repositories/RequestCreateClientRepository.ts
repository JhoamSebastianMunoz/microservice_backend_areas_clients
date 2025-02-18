import db from '../config/config-db';
import RequestCreateClientDto from '../Dto/RequestCreateClientDto';

class Request_createClienteRepository{
    static async request(client: RequestCreateClientDto){
        const sql = 'INSERT INTO clientes (cedula, nombre_completo_cliente, direccion, telefono, rut_nit, razon_social, estado, id_zona_de_trabajo ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
        const values = [client.cedula, client.nombre_completo_cliente, client.direccion, client.telefono, client.rut_nit, client.razon_social, 'Pendiente', client.id_zona_de_trabajo];        
        return db.execute(sql, values);
    }

    static async get(){
        const sql = `SELECT * FROM clientes WHERE estado = 'Pendiente'`;
        const [row] = await db.execute(sql);
        return row as RequestCreateClientDto[];
    }

    static async updateRequest(id_client: number){
        const sql = `UPDATE clientes SET estado = 'Activo' WHERE id_cliente = ?`;
        const [row] = await db.execute(sql,[id_client]);
        return row;
    }
}

export default Request_createClienteRepository;