import db from "../config/config-db";
import GetArea from "../Dto/GetAreaDto";

class MicroserviceUserRepository {
    static async getAreaById(id_zona: number) {
        const [result]: any = await db.execute(
            "SELECT * FROM zonas_de_trabajo WHERE id_zona_de_trabajo = ?",
            [id_zona]
        );
        return result.length > 0 ? result[0] : null;
    }
}

export default MicroserviceUserRepository;
