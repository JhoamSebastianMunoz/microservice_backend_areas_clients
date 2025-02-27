import GetArea from "../Dto/GetAreaDto";
import MicroserviceUserRepository from "../repositories/MicroserviceUser";

class MicorserviceUserService{

    static async getDataArea(id_area: number) {
        return await MicroserviceUserRepository.getAreaById(id_area);
    }
};

export default MicorserviceUserService;