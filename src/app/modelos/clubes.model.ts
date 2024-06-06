/*export class Clubes {
    id?:number;
    nombre:string | null | undefined;
    distrito_id: number| undefined;
   


    constructor(id?:number, nombre?:string, distrito_id?:number ){
        this.id = id;
        this.nombre = nombre;
        this.distrito_id = distrito_id;
    

    }
}*/

export class Clubes {
    id?: number;
    nombre?: string;
    distrito?: {
        id?: number;
        nombre?: string;
    };
    user_id?: number; // Agrega el campo user_id

    constructor(id?: number, nombre?: string, distrito_id?: number, distrito_nombre?: string, user_id?: number) {
        this.id = id;
        this.nombre = nombre;
        this.distrito = (distrito_id !== undefined && distrito_nombre !== undefined) ? {
            id: distrito_id,
            nombre: distrito_nombre
        } : undefined;
        this.user_id = user_id; // Inicializa el campo user_id
    }
}

