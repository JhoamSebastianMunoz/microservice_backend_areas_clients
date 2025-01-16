class DeleteArea {
    
    private _id_zona_de_trabajo: string;
    
    constructor(
        id_zona_de_trabajo: string,
    ) {
        this._id_zona_de_trabajo= id_zona_de_trabajo;    
    }   

    // Getter
    get id_zona_de_trabajo(): string {
        return this._id_zona_de_trabajo;
    }

    // Setters
    set id_zona_de_trabajo(id_zona_de_trabajo: string) {
        this._id_zona_de_trabajo = id_zona_de_trabajo;
    }    
};

export default DeleteArea;