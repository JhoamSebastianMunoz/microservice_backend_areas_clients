class GetClient {
    private _id_cliente: string;
    
    constructor(
        id_cliente: string,
    ) {
        this._id_cliente= id_cliente;    
    }   

    // Getter
    get id_cliente(): string {
        return this._id_cliente;
    }

    // Setters
    set id_cliente(id_cliente: string) {
        this._id_cliente = id_cliente;
    }    
};

export default GetClient;