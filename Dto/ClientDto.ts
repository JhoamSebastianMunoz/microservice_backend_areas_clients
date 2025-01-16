class Client {
    
    private _cedula : string;
    private _nombre_completo_cliente: string;
    private _direccion: string;
    private _telefono: string;
    private _rut_nit: string
    private _razon_social: string;
    private _estado: string;
    private _id_zona_de_trabajo: string;

    constructor(
        cedula : string, nombre_completo_cliente: string,
        direccion: string, telefono: string,
        rut_nit: string, razon_social: string,
        estado: string,id_zona_de_trabajo: string,
    ) {
        this._cedula = cedula;
        this._nombre_completo_cliente = nombre_completo_cliente;
        this._direccion = direccion;
        this._telefono = telefono;
        this._rut_nit = rut_nit;
        this._razon_social= razon_social;
        this._estado= estado;
        this._id_zona_de_trabajo= id_zona_de_trabajo;
    }

    // Getters
    get cedula(): string {
        return this._cedula;
    }
    get nombre_completo_cliente (): string {
        return this._nombre_completo_cliente ;
    }
    get direccion(): string {
        return this._direccion;
    }
    get telefono(): string {
        return this._telefono;
    }
    get rut_nit(): string {
        return this._rut_nit;
    }
    get razon_social(): string {
        return this._razon_social;
    }
    get estado(): string {
        return this._estado;
    }
    get id_zona_de_trabajo(): string {
        return this._id_zona_de_trabajo;
    }
    // Setters
    set cedula(cedula: string) {
        this._cedula = cedula;
    }
    set nombre_completo_cliente(nombre_completo_cliente: string) {
        this._nombre_completo_cliente = nombre_completo_cliente;
    }
    set direccion(direccion: string) {
        this._direccion = direccion;
    }
    set telefono(telefono: string) {
        this._telefono = telefono;
    }
    set rut_nit(rut_nit: string) {
        this._rut_nit = rut_nit;
    }
    set razon_social(razon_social: string) {
        this._razon_social = razon_social;
    }
    set estado(estado: string) {
        this._estado = estado;
    }
    set id_zona_de_trabajo(id_zona_de_trabajo: string) {
        this._id_zona_de_trabajo = id_zona_de_trabajo;
    }
    
};

export default Client;