import db from '../config/config-db';
import Client from '../Dto/ClientDto';
import GetClient from '../Dto/GetClientDto';
import DeleteClient from '../Dto/DeleteClientDto';
import UpdateClient from '../Dto/UpdateClientDto';

class ClientRepository {
    static async add(client: Client){
        const sql = 'INSERT INTO clientes (cedula, nombre_completo_cliente, direccion, telefono, rut_nit, razon_social, estado, id_zona_de_trabajo ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
        const values = [client.cedula, client.nombre_completo_cliente, client.direccion, client.telefono, client.rut_nit, client.razon_social, client.estado, client.id_zona_de_trabajo];        
        return db.execute(sql, values);
    }
    static async getAll(): Promise<GetClient[]> {
        const sql = "SELECT * FROM clientes WHERE estado IN('Activo', 'Inactivo', 'Pendiente')";
        const [rows] = await db.execute(sql); 
        return rows as GetClient[];
    }
    static async get(getClient : GetClient){
        const sql = 'SELECT * FROM clientes WHERE id_cliente= ?';
        const values = [getClient.id_cliente]; 
        const [rows] = await db.execute(sql, values);      
        return rows as GetClient[];
    }
    static async delete(deleteClient : DeleteClient){
        const sql = 'DELETE FROM clientes WHERE id_cliente = ?';
        const values = [deleteClient.id_cliente];
        const [result]: any = await db.execute(sql, values);
    return result.affectedRows; // Devuelve el número de filas afectadas.
    }
    static async update(updateClient : UpdateClient){
        const sql = 'UPDATE clientes SET cedula = ?, nombre_completo_cliente = ?, direccion = ?, telefono =  ?, rut_nit = ?, razon_social = ?, estado = ?, id_zona_de_trabajo = ? WHERE id_cliente = ?';
        const values = [ updateClient.cedula, updateClient.nombre_completo_cliente, updateClient.direccion, updateClient.telefono, updateClient.rut_nit, updateClient.razon_social, updateClient.estado, updateClient.id_zona_de_trabajo , updateClient.id_cliente]
        const result: any = await db.execute(sql,values);
        return result;
    }
};

export default ClientRepository;