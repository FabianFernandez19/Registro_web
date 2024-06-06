export class Admin {
    id?:number;
    email:string | null | undefined;
    password:string | null | undefined;


    constructor(id?:number, email?:string, password?:string){
        this.id = id;
        this.email = email;
        this.password = password;
    }
}
