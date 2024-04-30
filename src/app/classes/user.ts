export class User {

    id: string = '';
    mail: string = '';
    password: string = '';
    userName: string = '';
    rol: string = '';

    constructor(id: string, mail: string, password: string, userName: string, rol: string)
    {
        this.id = id;
        this.mail = mail;
        this.password = password;
        this.userName = userName;
        this.rol = rol;
    }

    initialize()
    {
        this.id = '';
        this.mail = '';
        this.password = '';
        this.userName = '';
        this.userName = '';
    }

    //Para las aplicaciones del parcial, los usuarios no tienen nombre de usuario, solo rol.
}
