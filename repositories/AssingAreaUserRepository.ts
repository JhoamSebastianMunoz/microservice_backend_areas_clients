import db from '../config/config-db';

class assign_AreaUserRepository{
    static async postAreaUser(id_usuario: number, zonas: number[]) {
        const values = zonas.map(id_zona => `(${id_usuario}, ${id_zona})`).join(",");
        const query = `INSERT IGNORE INTO usuario_zona (id_usuario, id_zona_de_trabajo) VALUES ${values}`;
        return await db.execute(query);
    }

    static async getAreaById(id_zona: number){
        const [result]: any = await db.execute(
            "SELECT * FROM zonas_de_trabajo WHERE id_zona_de_trabajo = ?",
            [id_zona]
        );
        return result.length > 0 ? result[0] : null;
    }

    //Obtener areas de un usuario como colaborador getAreaByUserColaborador
    static async getAreaByUserColaborador(id_usuario: number, userId:number) {
        const [result]: any = await db.execute(
            "SELECT z.id_zona_de_trabajo, z.nombre_zona_trabajo FROM usuario_zona uz JOIN zonas_de_trabajo z ON uz.id_zona_de_trabajo = z.id_zona_de_trabajo WHERE uz.id_usuario = ? AND uz.id_usuario = ?",
            [id_usuario, userId]
        );
        return result;
    }

    static async getAreaByUser(id_usuario: number) {
        const [result]: any = await db.execute(
            "SELECT z.id_zona_de_trabajo, z.nombre_zona_trabajo FROM usuario_zona uz JOIN zonas_de_trabajo z ON uz.id_zona_de_trabajo = z.id_zona_de_trabajo WHERE uz.id_usuario = ?",
            [id_usuario]
        );
        return result;
    }

    static async getClientsBtUser(id_usuario: number, id_zona: number) {
        const [result]: any = await db.execute(
            `SELECT zt.nombre_zona_trabajo, c.id_cliente, c.cedula, c.razon_social, c.nombre_completo_cliente, c.direccion, c.telefono
                FROM clientes c
                JOIN usuario_zona uz ON c.id_zona_de_trabajo = uz.id_zona_de_trabajo
                JOIN zonas_de_trabajo zt ON zt.id_zona_de_trabajo = uz.id_zona_de_trabajo 
                WHERE uz.id_usuario = ? AND uz.id_zona_de_trabajo = ?`,
            [id_usuario, id_zona]
        );
        return result;
    }
};

export default assign_AreaUserRepository;