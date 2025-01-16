import ClientRepository from '../repositories/ClientRepository';
import Client from '../Dto/ClientDto';
import GetClient from '../Dto/GetClientDto';
import DeleteClient from '../Dto/DeleteClientDto';
import UpdateClient from '../Dto/UpdateClientDto';

class ClientService {
    
    static async register_client(client: Client) {
        return await ClientRepository.add(client);
    }
    static async getClients(){
        return await ClientRepository.getAll();
    }
    static async getClient(getClient : GetClient){
        return await ClientRepository.get(getClient);
    }
    static async deleteClient(deleteClient: DeleteClient){
        return await ClientRepository.delete(deleteClient);
    } 
    static async updateClient(updateClient: UpdateClient){
        return await ClientRepository.update(updateClient);
    }
};

export default ClientService;