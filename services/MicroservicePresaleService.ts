import MicroservicePresaleRepository from "../repositories/MicroservicePresaleRepository";

class MicroservicePresaleService{
    // funcion para el microservicio preventa
    static async getDataClient(dataClient: string){
        const rows:any[] = await MicroservicePresaleRepository.getDataClient(dataClient)
        if (rows.length === 0) {
            throw new Error(`Cliente con ID ${dataClient} no encontrado`);
        }
        return rows[0]
    }
}

export default MicroservicePresaleService;