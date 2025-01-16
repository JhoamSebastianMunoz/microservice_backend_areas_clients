class Area {
    
    private _nombre_zona_trabajo: string;
    private _descripcion: string;
    
    constructor(
        nombre_zona_trabajo: string, descripcion: string,
    ) {
        this._nombre_zona_trabajo = nombre_zona_trabajo;
        this._descripcion = descripcion;
    }

    // Getters
    get nombre_zona_trabajo(): string {
        return this._nombre_zona_trabajo;
    }
    get descripcion (): string {
        return this._descripcion;
    }
    // Setters
    set nombre_zona_trabajo(nombre_zona_trabajo: string) {
        this._nombre_zona_trabajo = nombre_zona_trabajo;
    }
    set descripcion(descripcion: string) {
        this._descripcion = descripcion;
    }
};

export default Area;