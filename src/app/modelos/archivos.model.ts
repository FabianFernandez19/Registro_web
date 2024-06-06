export class Archivos {
    id?:number;
    name:string | null | undefined;
    path:string | null | undefined;
    club_id: number| undefined;


    constructor(id?:number, name?:string, path?:string, club_id?:number){
        this.id = id;
        this.name = name;
        this.path = path;
        this.club_id = club_id;
    }
}
