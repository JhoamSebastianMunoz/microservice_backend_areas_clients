import RequestCreateClientDto from "../Dto/RequestCreateClientDto";
import Request_createClienteRepository from "../repositories/RequestCreateClientRepository";


class requestCreateClientService{
    static async request_createClient(client: RequestCreateClientDto) {
        return await Request_createClienteRepository.request(client);
    }

    static async getPendingRequests(){
        return await Request_createClienteRepository.get();
    }
}

export default requestCreateClientService;