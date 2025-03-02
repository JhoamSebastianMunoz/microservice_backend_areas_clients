import db from '../config/config-db';
import Area from '../Dto/AreaDto';
import GetArea from '../Dto/GetAreaDto';
import DeleteArea from '../Dto/DeleteAreaDto';
import UpdateArea from '../Dto/UpdateAreaDto';

class AreaRepository {
    static async add(area: Area ){
        const sql = 'INSERT INTO zonas_de_trabajo (nombre_zona_trabajo, descripcion) VALUES (?, ?)';
        const values = [area.nombre_zona_trabajo, area.descripcion];        
        return db.execute(sql, values);
    }
    static async getAll(): Promise<GetArea[]> {
        const sql = 'SELECT * FROM zonas_de_trabajo';
        const [rows] = await db.execute(sql); 
        return rows as GetArea[];
    }
    static async get(getArea : GetArea){
        const sql = 'SELECT * FROM  zonas_de_trabajo WHERE id_zona_de_trabajo= ?';
        const values = [getArea.id_zona_de_trabajo]; 
        const [rows] = await db.execute(sql, values);      
        return rows as GetArea[];
    }
    static async delete(deleteArea : DeleteArea){
        const sql = 'DELETE FROM zonas_de_trabajo WHERE id_zona_de_trabajo = ?';
        const values = [deleteArea.id_zona_de_trabajo];
        const [result]: any = await db.execute(sql, values);
        return result.affectedRows; // Devuelve el número de filas afectadas.
    }
    static async update(updateArea : UpdateArea ){
        const sql = 'UPDATE zonas_de_trabajo SET nombre_zona_trabajo = ?, descripcion = ? WHERE id_zona_de_trabajo = ?';
        const values = [updateArea.nombre_zona_trabajo, updateArea.descripcion, updateArea.id_zona_de_trabajo]
        const [result]: any = await db.execute(sql,values);
        return result;
    }
};

export default AreaRepository;