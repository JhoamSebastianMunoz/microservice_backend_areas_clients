class UpdateArea {
    
    private _id_zona_de_trabajo: string;
    private _nombre_zona_trabajo: string;
    private _descripcion: string;

    constructor(
        id_zona_de_trabajo:string, nombre_zona_trabajo: string,
        descripcion: string,
    ) {
        this._id_zona_de_trabajo = id_zona_de_trabajo;
        this._nombre_zona_trabajo = nombre_zona_trabajo;
        this._descripcion = descripcion;
    }

    // Getters
    get id_zona_de_trabajo(): string {
        return this._id_zona_de_trabajo;
    }
    get nombre_zona_trabajo(): string {
        return this._nombre_zona_trabajo;
    }
    get descripcion (): string {
        return this._descripcion ;
    }
    // Setters
    set id_zona_de_trabajo(id_zona_de_trabajo:string){
        this._id_zona_de_trabajo = id_zona_de_trabajo;
    }
    set nombre_zona_trabajo(nombre_zona_trabajo: string) {
        this._nombre_zona_trabajo = nombre_zona_trabajo;
    }
    set descripcion(descripcion: string) {
        this._descripcion = descripcion;
    }
};

export default UpdateArea;