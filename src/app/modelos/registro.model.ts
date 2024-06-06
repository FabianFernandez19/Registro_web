export class Registro {
    id?:number;
    name:string | null | undefined;
    email:string | null | undefined;
    password: string | null | undefined;


    constructor(id?:number, name?:string, email?:string, password?:string ){
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;

    }
}
